const amqp = require('amqplib');

const RABBIT_URL = process.env.RABBIT_URL;

let connection = null;
let channel = null;

// Helper to connect only once
async function connect() {
    if (channel) return channel;

    try {
        connection = await amqp.connect(RABBIT_URL);
        channel = await connection.createChannel();

        console.log("RabbitMQ connected");
        return channel;

    } catch (err) {
        console.error("RabbitMQ connection failed:", err.message);
        throw err;
    }
}

// Safe subscriber
async function subscribeToQueue(queueName, callback) {
    try {
        const ch = await connect();

        await ch.assertQueue(queueName, { durable: true });

        ch.consume(queueName, (msg) => {
            if (!msg) return;

            try {
                callback(msg.content.toString());
            } catch (err) {
                console.error("Error processing message:", err.message);
            }

            ch.ack(msg);
        });

    } catch (err) {
        console.error(`Failed to subscribe to ${queueName}:`, err.message);
    }
}

// Safe publisher
async function publishToQueue(queueName, data) {
    try {
        const ch = await connect();

        await ch.assertQueue(queueName, { durable: true });

        const sent = ch.sendToQueue(queueName, Buffer.from(data));

        if (!sent) {
            console.warn(`Queue ${queueName} is backed up, send failed`);
        }

    } catch (err) {
        console.error(`Failed to publish to ${queueName}:`, err.message);
    }
}

module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect
};
