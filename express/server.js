require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//const { createProxyMiddleware } = require("http-proxy-middleware");
const socket = require("socket.io");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
mongoose.connect("mongodb://127.0.0.1:27017/ServicesLink");
const db = mongoose.connection;
app.use(
  cors({
    credentials: true,
    origin: true,
    accept: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: "IUDHSDCioudshcJOIHSsdjoOUo",
    resave: false,
    saveUninitialized: false,
    name: "session-id",
    // cookie: { secure: true },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/ServicesLink",
    }),
  })
);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/tests", require("./routes/tests"));
app.use("/messages", require("./routes/messages"));

const server = app.listen(3000, () => console.log("Server Started"));

const io = socket(server, {
  cors: {
    credentials: true,
    origin: true,
    accept: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    //console.lohg online users
    console.log("onlineUsers " + onlineUsers);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
