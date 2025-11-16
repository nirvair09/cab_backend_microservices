const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.routes");

app.use("/cab/user", userRouter);

module.exports = app;