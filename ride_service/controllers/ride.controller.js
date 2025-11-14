const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
    try {

        const { pickup, destination } = req.body;

        if (!pickup || !destination) {
            return res.status(400).json({ message: "Pickup and Destination are required" });
        }

        console.log("Ride request received:", { pickup, destination });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

