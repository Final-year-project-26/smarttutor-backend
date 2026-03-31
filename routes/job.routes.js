const express = require("express");
const router = express.Router();

const { getJobs } = require("../controllers/job.controller");

router.get("/jobs", getJobs);

module.exports = router;