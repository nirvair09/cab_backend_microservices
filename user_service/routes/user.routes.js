const express = require('express');
const { registerUser, loginUser, logOutUser, getUserProfile, acceptedRide } = require('../controllers/user.controller');
const { userAuth } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);

router.get("/profile", userAuth, getUserProfile);
router.get("/accepted-ride", userAuth, acceptedRide);

module.exports = router;