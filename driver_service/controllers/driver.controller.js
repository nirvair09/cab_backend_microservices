const driverModel = require("../models/driver.model");
// const blackListTokenModel = require("../models/blacklistedTokens.model");
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