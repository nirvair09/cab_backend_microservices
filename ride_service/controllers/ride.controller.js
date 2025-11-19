const rideModel = require("../models/ride.model");
const { publishToQueue } = require("../rabbit_service/rabbit.service");

module.exports.createRide = async (req, res, next) => {

    const { pickupLocation, destination } = req.body;

    const newRide = new rideModel({
        userID: req.user._id,
        pickupLocation,
        destination,
        status: "requested"
    });


    await newRide.save();
    // console.log("Publishing to queue", newRide);
    publishToQueue("new-ride", JSON.stringify(newRide));

    res.send(newRide);
};


module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.body;

    const ride = await rideModel.findById(rideId);

    if (!ride) {
        return res.status(404).send({ message: "Ride not found" });
    }

    ride.status = "accepted";
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride));

    res.send(ride);
}