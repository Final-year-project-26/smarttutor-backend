const express = require("express");
const router = express.Router();

const { applyTutor } = require("../controllers/tutor.controller");
const { protect } = require("../middleware/authMiddleware");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Tutor API working");
});

// Apply to job
router.post("/apply/:jobId", protect, applyTutor);

module.exports = router;