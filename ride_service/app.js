const express = require("express");
const cookieParser = require("cookie-parser");
const rideRouter = require("./routes/ride.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/cab/ride", rideRouter);

module.exports = app;
