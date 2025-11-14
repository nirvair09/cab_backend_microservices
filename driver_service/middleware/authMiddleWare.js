const jwt = require('jsonwebtoken');
const driverModel = require('../models/driver.model');
const blacklistModel = require('../models/blacklisttoken.model');

module.exports.driverAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: "Please login first" });
        }

        const isBlackListed = await blacklistModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).send({ message: "Token is blacklisted. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const driver = await driverModel.findById(decoded.id);

        if (!driver) {
            return res.status(401).send({ message: "User not found. Please login again." });
        }

        req.driver = driver;
        next();
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}