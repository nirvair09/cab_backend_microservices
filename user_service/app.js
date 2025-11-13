const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");



dotenv.config();

connectDB();

const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/cab/user", userRoutes);

module.exports = app;