const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    driverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "driver",
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    destination: {
        type: String,
        required: true
    },

    pickupLocation: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        emun: ["requested", "ongoing", "compleed", "cancelled"],
        default: "requested",
    }
}

    , {
        timestamps: true
    });


module.exports = mongoose.model("ride", rideSchema);