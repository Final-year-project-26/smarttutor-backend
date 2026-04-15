const express = require("express");
const router = express.Router();

const { getJobs } = require("../controllers/job.controller");

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Jobs API working");
});

// GET JOBS
router.get("/list", getJobs);

module.exports = router;