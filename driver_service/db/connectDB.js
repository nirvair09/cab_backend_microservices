const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        // await mongoose.connect(process.env.MONGO_URI);
        // console.log("MongoDB connected successfully to driver service");

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully form Driver Service");
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;