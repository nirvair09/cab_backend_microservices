const express = require("express");
const { userAuth, driverAuth } = require("../middleware/auth.middleware");
const { createRide, acceptRide } = require("../controllers/ride.controller");
const rideRouter = express.Router();

rideRouter.post("/create-ride", userAuth, createRide);
rideRouter.put("/accept-ride", driverAuth, acceptRide);

module.exports = rideRouter;