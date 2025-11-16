const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklisttoken.model');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Please login first" });
        }

        const isBlackListed = await blacklistModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).send({ message: "Token is blacklisted. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send({ message: "User not found. Please login again." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}