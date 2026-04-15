const express = require("express");
const router = express.Router();

const { protect, allowRoles } = require("../middleware/authMiddleware");

const {
  createTutorJob,
  approveTutor,
  rejectTutor,
  getApplications
} = require("../controllers/manager.controller");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Manager API working");
});

// Create job
router.post("/job", protect, allowRoles("manager"), createTutorJob);

// Approve tutor
router.put("/approve/:applicationId", protect, allowRoles("manager"), approveTutor);

// Reject tutor
router.put("/reject/:applicationId", protect, allowRoles("manager"), rejectTutor);

// Get applications
router.get("/applications", protect, allowRoles("manager"), getApplications);

module.exports = router;