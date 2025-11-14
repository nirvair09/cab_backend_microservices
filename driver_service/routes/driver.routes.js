const express = require("express");
const { registerDriver, loginDriver, logOutDriver, getDriverProfile } = require("../controllers/driver.controller");
const { driverAuth } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.post("/logout", logOutDriver);

router.get("/profile", driverAuth, getDriverProfile);

module.exports = router;

