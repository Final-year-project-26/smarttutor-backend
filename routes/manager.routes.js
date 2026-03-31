const express = require("express");
const router = express.Router();

const { protect, allowRoles } = require("../middleware/authMiddleware");

// IMPORT CONTROLLER FUNCTIONS
const { createTutorJob, approveTutor, rejectTutor, getApplications } = require("../controllers/manager.controller");

// Create tutor job
router.post("/job", protect, allowRoles("manager"), createTutorJob);

// Approve tutor
router.put("/approve/:applicationId", protect, allowRoles("manager"), approveTutor);
// reject tutor
router.put("/reject/:applicationId", protect, allowRoles("manager"), rejectTutor);
//get all tutor applications
router.get("/applications", protect, allowRoles("manager"), getApplications);

module.exports = router;