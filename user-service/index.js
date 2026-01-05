const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
