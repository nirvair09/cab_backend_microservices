const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

module.export = app;