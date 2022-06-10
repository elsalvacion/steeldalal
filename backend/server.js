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

// require routes

const user = require("./routes/user");
const product = require("./routes/product");
const category = require("./routes/category");
const keys = require("./routes/keys");
const connection = require("./config/db");

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

app.get("/config/paypal", (req, res) => {
  try {
    res.json({ msg: process.env.PAYMENT_METHOD_ID });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Payment method not available" });
  }
});

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (userId) => socket.join(userId));
  socket.on("check_if_online", (userId) => {
    const connected = io.sockets.adapter.rooms.get(userId).size;
    socket.emit("is_online", connected);
  });
  // send messages
  socket.on("send_message", (data) => {
    const { message, product, to, from } = data;
    const sql = `insert into messages (message, product, to_who, from_who) values(? , ? , ? , ?)`;
    connection.query(
      sql,
      [message, Number(product), to, from],
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
    const { product, to, from } = data;
    const sql = `select * from messages where (to_who = ? and from_who = ? and product = ?) or (to_who = ? and from_who = ? and product = ?)`;
    connection.query(
      sql,
      [to, from, Number(product), from, to, Number(product)],
      (loadMessagesErr, loadMessagesRes) => {
        if (loadMessagesErr) {
          console.log(loadMessagesErr);
        } else {
          // console.log(loadMessagesRes);
          socket.emit("messages_loaded", loadMessagesRes);
        }
      }
    );
  });

  // load senders
  socket.on("load_senders", (userId) => {
    const sql = `select  distinct from_who, product, name from messages, users  where to_who = ? and users.id = messages.from_who group by name, product order by messages.createdAt desc`;
    connection.query(sql, [userId], (loadSendersErr, loadSendersRes) => {
      if (loadSendersErr) console.log(loadSendersErr);
      else {
        // console.log(loadSendersRes);
        socket.emit("senders_loaded", loadSendersRes);
      }
    });
  });

  // get unread messages
  socket.on("load_unread_messages", (userId) => {
    const sql = `select count(from_who) from messages where to_who = ?  and isRead = ?`;
    connection.query(sql, [userId, 0], (loadUnreadErr, loadUnreadRes) => {
      if (loadUnreadErr) {
        console.log(loadUnreadErr);
      } else {
        // console.log(loadUnreadRes[0]["count(from_who)"]);
        socket.emit("unread_messages_loaded", {
          userId,
          unread: loadUnreadRes[0]["count(from_who)"],
        });
      }
    });
  });
});
// listen to a port
httpServer.listen(PORT, () =>
  console.log(
    `server up and running on ${process.env.NODE_ENV} MODE at ${PORT}`
  )
);
