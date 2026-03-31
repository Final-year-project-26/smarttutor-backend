const express = require("express");
const router = express.Router();

// Controllers
const { createCourse, enrollCourse } = require("../controllers/course.controller");

// Middleware
const { protect } = require("../middleware/authMiddleware"); // JWT auth middleware
const { allowRoles } = require("../middleware/roleMiddleware");

// ------------------------------
// Tutor creates a course
// Only approved tutors can create courses
// ------------------------------
router.post("/create", protect, allowRoles("tutor"), createCourse);

// ------------------------------
// Student enrolls in a course
// Only students can enroll
// ------------------------------
router.post("/enroll/:courseId", protect, allowRoles("student"), enrollCourse);

module.exports = router;