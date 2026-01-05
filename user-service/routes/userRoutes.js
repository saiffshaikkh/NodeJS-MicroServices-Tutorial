const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = new User({ name, email });
    await user.save();
    console.log(user);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Creating User" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({ message: "Users fetched", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Getting User" });
  }
});

module.exports = router;
