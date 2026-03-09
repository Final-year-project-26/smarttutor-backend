const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const User = require("../models/User");


// GET logged-in user
router.get("/me", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET all users (admin only)
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE user (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;