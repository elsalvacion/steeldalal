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
          socket.emit(
            "send_message_error",
            "Only live chat availiable at the moment"
          );
        } else {
          connection.query(
            `select * from messages where to_who = ? and from_who = ? and product = ? `,
            [to, from, Number(product)],
            (loadMessagesErr, loadMessagesRes) => {
              if (loadMessagesErr) {
                console.log(loadMessagesErr);
                socket.emit(
                  "send_message_error",
                  "Only live chat availiable at the moment"
                );
              } else {
                socket.emit("messages_loaded", loadMessagesRes);
              }
            }
          );
        }
      }
    );
  });

  // load messages
  socket.on("load_messages", (data) => {
    const { to, from, product } = data;

    connection.query(
      `select * from messages where to_who = ? and from_who = ? and product = ? `,
      [to, from, Number(product)],
      (loadMessagesErr, loadMessagesRes) => {
        if (loadMessagesErr) {
          console.log(loadMessagesErr);
          socket.emit(
            "send_message_error",
            "Only live chat availiable at the moment"
          );
        } else {
          socket.emit("messages_loaded", loadMessagesRes);
        }
      }
    );
  });

  // load users
  socket.on("load_users", (id) => {
    const sql = `select distinct from_who, name from messages, users where to_who = ? and from_who = users.id group by name order by messages.createdAt desc`;
    connection.query(sql, [id], (fetchUsersErr, fetchUsersRes) => {
      if (fetchUsersErr) {
        console.log(fetchUsersErr);
      } else {
        // select first user messages
        if (fetchUsersRes.length > 0) {
          connection.query(
            `select * from messages where from_who = ? or (from_who = ? and to_who = ?)`,
            [fetchUsersRes[0].from_who, id, fetchUsersRes[0].from_who],
            (fetchMessagesErr, fetchMessagesRes) => {
              if (fetchMessagesErr) {
                console.log(fetchMessagesErr);
              } else {
                socket.emit("users_loaded", {
                  messages: fetchMessagesRes,
                  users: fetchUsersRes,
                });
              }
            }
          );
        } else {
          socket.emit("users_loaded", {
            users: [],
            messages: [],
          });
        }
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
