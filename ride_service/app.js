const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
dotenv.config();

const cookieParser = require("cookie-parser");
const router = require("./routes/ride.routes");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

module.export = app;