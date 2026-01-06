const amqp = require("amqplib");
let channel, connection;
async function connectToRabbitMQ(retries = 5, delay = 3000) {
  try {
    while (retries > 0) {
      try {
        connection = await amqp.connect("amqp://task-rabbitmq");
        channel = await connection.createChannel();
        await channel.assertQueue("task_queue");
        console.log("Connected to RabbitMQ");
        retries = 0;
      } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        retries--;
      }
    }
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    if (retries > 0) {
      setTimeout(() => {
        connectToRabbitMQ(retries - 1, delay);
      }, delay);
    }
  }
}
const getChannel = () => channel;

module.exports = { connectToRabbitMQ, getChannel };
