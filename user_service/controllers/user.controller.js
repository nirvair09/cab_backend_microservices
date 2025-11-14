const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blacklisttoken.model')

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
};


module.exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const isUserPresent = await userModel.findOne({ email }).select("+password");

        if (!isUserPresent) {
            return res.status(400).json({ message: "User not present with this email id" });
        }

        const comparePassword = await bcrypt.compare(password, isUserPresent.password);

        if (!comparePassword) {
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign({ id: isUserPresent._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        const userWithOutPassword = isUserPresent.toObject();
        delete userWithOutPassword.password;

        res.cookie("token", token);

        res.send({ token, user: userWithOutPassword });


    } catch (error) {
        return res.status(500).json({ message: "Error in logging in user", error: error.message });
    }
};

module.exports.logOutUser = async (req, res) => {
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

module.exports.getUserProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        return res.status(500).json({ message: "Error in fetching user profile", error: error.message });
    }
};

module.exports.acceptRide = async (req, res) => {
    rideEventEmitter.once("ride-accepted", (data) => {
        res.send(data);
    });

    setTimeout(() => {
        res.status(204).send();
    }, 30000);
}

subscribeToQueue('ride-accepted', async (msg) => {
    const data = JSON.parse(msg);
    rideEventEmitter.emit('ride-accepted', data);
});