const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const bookRouter = require("./routes/api/books");
const orderRouter = require("./routes/api/orders");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users/", authRouter);
app.use("/books/", bookRouter);
app.use("/orders/", orderRouter);

app.use(express.static("public"));
app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, _, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
