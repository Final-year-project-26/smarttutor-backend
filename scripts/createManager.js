require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");

const createManager = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    const existingManager = await User.findOne({ role: "manager" });

    if (existingManager) {
      console.log("Manager already exists");
      process.exit();
    }

    const manager = new User({
      name: "System Manager",
      email: "hanateshager11@gmail.com",
      password: "manager123",
      role: "manager",
      isVerified: true
    });

    await manager.save();

    console.log("Manager created successfully");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createManager();