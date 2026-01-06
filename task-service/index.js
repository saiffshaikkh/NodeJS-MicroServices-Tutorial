const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { connectToRabbitMQ } = require("./config/rabbitmq");

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3001;

app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Task Service is running on port ${PORT}`);
  connectToRabbitMQ();
});
