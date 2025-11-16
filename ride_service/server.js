require("dotenv").config();
const http = require("http");

const app = require("./app");
const connectDB = require("./db/connectDB");
const { connectRabbit } = require("./rabbit_service/rabbit.service");

async function startServer() {
    try {
        console.log("Starting Ride Service...");

        // Step 1 → Connect to Mongo
        await connectDB();
        console.log("MongoDB connected");

        // Step 2 → Connect to RabbitMQ (with retry)
        await connectRabbit();
        console.log("RabbitMQ connected");

        // Step 3 → Start HTTP server
        const server = http.createServer(app);

        server.listen(process.env.USER_PORT, () => {
            console.log(`Ride Service running on port ${process.env.RIDE_PORT}`);
        });

    } catch (err) {
        console.error("Startup failed:", err.message);
        process.exit(1);
    }
}

startServer();
