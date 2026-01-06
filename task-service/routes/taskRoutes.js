const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/tasks", async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({
      title,
      description,
      userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
