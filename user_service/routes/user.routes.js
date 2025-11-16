const express = require('express');
const { registerUser, loginUser, logOutUser, getUserProfile, acceptedRide } = require('../controllers/user.controller');
const { userAuth } = require("../middleware/authMiddleWare");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOutUser);

userRouter.get("/profile", userAuth, getUserProfile);
userRouter.get("/accepted-ride", userAuth, acceptedRide);

module.exports = userRouter;