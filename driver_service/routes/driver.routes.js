const express = require("express");
const { registerDriver, loginDriver, logOutDriver, getDriverProfile, waitForNewRide, toggleAvailabilty } = require("../controllers/driver.controller");
const { driverAuth } = require("../middleware/authMiddleWare");

const driverRouter = express.Router();

driverRouter.post("/register", registerDriver);
driverRouter.post("/login", loginDriver);
driverRouter.post("/logout", logOutDriver);

driverRouter.get("/profile", driverAuth, getDriverProfile);
driverRouter.get("/new-ride", driverAuth, waitForNewRide);

driverRouter.patch("/toggle-availability", driverAuth, toggleAvailabilty);

module.exports = driverRouter;

