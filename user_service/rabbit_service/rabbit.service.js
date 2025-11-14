const ampq = require('amqplib');

const RABBIT_URL = process.env.RABBIT_URL;


let connection, channel;

async function connect(params) {

    connection = await ampq.connect(RABBIT_URL);

    channel = await connection.createChannel();

    console.log("RabbitMQ connected");

}

async function subscribeToQueue(queueName, callback) {

    if (!channel) await connect();

    await channel.assertQueue(queueName);

    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
};


async function publishToQueue(queueName, data) {
    if (!channel) await connect();

    await channel.assertQueue(queueName);

    channel.sendToQueue(queueName, Buffer.from(data));
};

module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect
};



