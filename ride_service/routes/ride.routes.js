const express = require("express");
const { userAuth, driverAuth } = require("../middleware/auth.middleware");
const { createRide, acceptRide } = require("../controllers/ride.controller");
const router = express.Router();

router.post("/create-ride", userAuth, createRide);
router.post("/accept-ride", driverAuth, acceptRide);

module.exports = router;