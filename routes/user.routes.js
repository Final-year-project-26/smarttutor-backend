const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const User = require("../models/User");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("User API working");
});

// GET logged-in user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// GET all users
router.get("/all", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// DELETE user
router.delete("/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();

  res.json({ message: "User deleted successfully" });
});

module.exports = router;