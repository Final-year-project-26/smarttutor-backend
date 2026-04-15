const express = require("express");
const router = express.Router();

const { createCourse, enrollCourse } = require("../controllers/course.controller");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Course API working");
});

router.post("/create", protect, allowRoles("tutor"), createCourse);
router.post("/enroll/:courseId", protect, allowRoles("student"), enrollCourse);

module.exports = router;