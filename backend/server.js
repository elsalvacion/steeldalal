const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const path = require("path");
// require routes
const user = require("./routes/user");
const order = require("./routes/order");
const product = require("./routes/product");
const category = require("./routes/category");
const keys = require("./routes/keys");
const seller = require("./routes/seller");
const connection = require("./config/db");
const { sendMessage } = require("./utils/sendEmail");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// static files
app.use(express.static("public"));

// external middlewares
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(fileUpload());
// express body parser
app.use(express.json());

// routes middleware
app.use("/auth", user);
app.use("/product", product);
app.use("/category", category);
app.use("/keys", keys);
app.use("/order", order);
app.use("/seller", seller);

app.get("/config/paypal", (req, res) => {
  try {
    res.status(200).json({ msg: process.env.PAYMENT_METHOD_ID });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Payment method not available" });
  }
});

app.post("/contact", (req, res) => {
  try {
    const details = req.body;
    details.to = `+8801858328387`;
    details.message = `
*Contact Message*

_Subject: ${details.subject}_

${details.message}
  
_*Send By:* ${details.name}_
_*Whatsapp:* ${details.phone}_
_*From:* steeldalal.com_
    `;
    sendMessage(details, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Server Error: Try other methods." });
  }
});

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  if (socket.connected) {
    io.local.emit("new_user_connected", "connected");
  } else {
    io.local.emit("bye", "disconnected");
  }
  socket.on("disconnect", () => io.local.emit("bye", "disconnected"));
  socket.on("join_room", (userId) => {
    io.local.emit("new_user_connected", "connected");
    socket.join(userId);
  });
  socket.on("check_if_online", (userId) => {
    const connected = io.sockets.adapter.rooms.get(userId);
    if (connected) {
      socket.emit("is_online", connected.size);
    } else {
      socket.emit("is_online", 0);
    }
  });

  // send messages

  socket.on("send_message", (data) => {
    const { message, product, to, from } = data;

    const sql = `insert into messages (message, product, to_who, from_who) values(? , ? , ? , ?)`;

    connection.query(
      sql,

      [message, Number(product), String(to), String(from)],

      (insertMessageErr, insertMessageRes) => {
        if (insertMessageErr) {
          console.log(insertMessageErr);
        } else {
          io.local.emit("message_sent", "message sent");
        }
      }
    );
  });

  // load messages
  socket.on("load_messages", (data) => {
    const to = String(data.to);
    const from = String(data.from);

    let sql;
    if (data.product) {
      const product = Number(data.product);
      sql = `select * from messages where (to_who = "${to}" and from_who = "${from}" and product = ${product}) or (to_who = "${from}" and from_who = "${to}" and product = ${product})`;
    } else {
      sql = `select * from messages where (to_who = "${to}" and from_who = "${from}") or (to_who = "${from}" and from_who = "${to}")`;
    }
    connection.query(sql, (loadMessagesErr, loadMessagesRes) => {
      if (loadMessagesErr) {
        console.log(loadMessagesErr);
      } else {
        // console.log(loadMessagesRes);
        socket.emit("messages_loaded", loadMessagesRes);
      }
    });
  });

  // load senders

  socket.on("load_senders", (userId) => {
    const sql = `
    select distinct users.* from users, messages where users.id = messages.from_who and to_who = ?;
    select distinct facebook.* from facebook, messages where facebook.id = messages.from_who and to_who = ?;
    select distinct google.* from google, messages where google.id = messages.from_who and to_who = ?
    
    
    `;

    connection.query(
      sql,
      [userId, userId, userId],
      (loadSendersErr, loadSendersRes) => {
        if (loadSendersErr) console.log(loadSendersErr);
        else {
          const newSendersRes = [];
          const allSenders = []
            .concat(loadSendersRes[0])
            .concat(loadSendersRes[1])
            .concat(loadSendersRes[2]);
          allSenders.forEach((sender, i) => {
            const connected = io.sockets.adapter.rooms.get(sender.id);
            const data = {
              ...sender,
              online: connected ? true : false,
            };

            connection.query(
              `select count(isRead) from messages where to_who = ?  and from_who = ? and isRead = ?;
                select product from messages where to_who = ?  and from_who = ? order by id desc limit 1;
                select message from messages where (from_who = ?  and to_who = ?) or (to_who = ?  and from_who = ?) order by id desc limit 1;
                `,
              [
                userId,
                sender.id,
                0,
                userId,
                sender.id,
                userId,
                sender.id,
                userId,
                sender.id,
              ],
              (isReadErr, isReadRes) => {
                if (isReadErr) console.log(isReadErr);
                else {
                  // console.log(isReadRes[1]);
                  data.unread = isReadRes[0][0]["count(isRead)"];
                  data.product = isReadRes[1][0].product;
                  data.message = isReadRes[2][0].message;
                  connection.query(
                    `select * from products where id = ?`,
                    [data.product],
                    (fetchProductErr, fetchProductRes) => {
                      if (fetchProductErr) console.log(fetchProductErr);
                      else {
                        data.product = fetchProductRes[0];
                        newSendersRes.push(data);

                        if (i === allSenders.length - 1) {
                          socket.emit("senders_loaded", newSendersRes);
                        }
                      }
                    }
                  );
                }
              }
            );
          });
        }
      }
    );
  });

  // get unread messages
  socket.on("load_unread_messages", (userId) => {
    const sql = `select count(from_who) from messages where to_who = ?  and isRead = ?`;
    connection.query(sql, [userId, 0], (loadUnreadErr, loadUnreadRes) => {
      if (loadUnreadErr) {
        console.log(loadUnreadErr);
      } else {
        socket.emit("unread_messages_loaded", {
          userId,
          unread: loadUnreadRes[0]["count(from_who)"],
        });
      }
    });
  });

  // mark as read
  socket.on("mark_as_read", ({ to, from }) => {
    const sql = `update messages set isRead = 1 where to_who = ? and from_who = ?`;
    connection.query(sql, [to, from], (markAsReadErr, markAsReadRes) => {
      if (markAsReadErr) console.log(markAsReadErr);
      else socket.emit("message_marked_as_read");
    });
  });
});

// listen to a port

httpServer.listen(PORT, () =>
  console.log(
    `server up and running on ${process.env.NODE_ENV} MODE at ${PORT}`
  )
);
