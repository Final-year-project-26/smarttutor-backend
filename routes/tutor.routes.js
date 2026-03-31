const express = require("express");
const router = express.Router();

const { applyTutor } = require("../controllers/tutor.controller");
const { protect } = require("../middleware/authMiddleware");

// Apply to a specific job
router.post("/apply/:jobId", protect, applyTutor);

module.exports = router;