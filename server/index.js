const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const http = require("http");
const users = require("./routes/users");
const chat = require("./routes/chat");
const categories = require("./routes/categories");
const products = require("./routes/products");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DBURI,
      ttl: 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/upload", express.static("upload"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/products", products);

app.use("/", chat);
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
