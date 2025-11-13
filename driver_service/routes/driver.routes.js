const express = require("express");
const { registerDriver, loginDriver, logOutDriver } = require("../controllers/driver.controller");

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.post("/logout", logOutDriver);

module.exports = router;

