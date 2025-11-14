const driverModel = require("../models/driver.model");
const blackListTokenModel = require('../models/blacklisttoken.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller logic will be added here in the future
module.exports.registerDriver = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingDriver = await driverModel.findOne({ email });

        if (existingDriver) {
            return res.status(400).json({ message: "Driver already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newDriver = new driverModel({
            name, email, password: hashedPassword
        });

        await newDriver.save();

        const token = jwt.sign({ id: newDriver._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("token", token);

        const driverWithOutPassword = newDriver.toObject();
        delete driverWithOutPassword.password;

        res.send({ token, driver: driverWithOutPassword });


    } catch (error) {
        res.status(500).json({ message: "Error in registering driver", error: error.message });

    }
};

module.exports.loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingDriver = await driverModel.findOne({ email }).select("+password");;

        if (!existingDriver) {
            return res.status(400).json({ message: "Driver donot exists" });
        }
        console.log("Existing Driver:", existingDriver);
        console.log("Password from req:", password);
        console.log("Password from DB:", existingDriver.password);


        const comparePassword = await bcrypt.compare(password, existingDriver.password);


        if (!comparePassword) {
            return res.status(400).json({ message: "Wrong Password" });

        }

        const token = jwt.sign({ id: existingDriver._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("token", token);

        const driverWithOutPassword = existingDriver.toObject();
        delete driverWithOutPassword.password;

        res.send({ token, driver: driverWithOutPassword });


    } catch (error) {
        res.status(500).json({ message: "Error in registering driver", error: error.message });

    };
};

module.exports.logOutDriver = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token found in cookies" });
        }

        const blackToken = await blackListTokenModel({ token });
        blackToken.save();
        console.log(blackToken);

        res.clearCookie('token');

        return res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error in logging out user", error: error.message });
    }
};

module.exports.getDriverProfile = async (req, res) => {
    try {

        res.send(req.driver);

    } catch (error) {
        return res.status(500).json({ message: "Error in fetching driver profile", error: error.message });
    }
}