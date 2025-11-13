const userModel = require('../models/user.model');


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already existing with this email" });
        }
        const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
        const hashedPassword = await bcrypt.hash(password, rounds);

        const newUser = new userModel({
            name, email, password: hashedPassword
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("token", token);

        delete newUser._doc.password;

        res.send({ token, newUser });


    } catch (error) {

        res.status(500).json({ message: "Error in registering user", error: error.message });

    }
}