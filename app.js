// app.js
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

/* ================================
   Global Middlewares
================================ */

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

/* ================================
   Routes
================================ */

// Auth routes (login/register)
app.use("/api/auth", require("./routes/auth.routes"));

// User routes
app.use("/api/users", require("./routes/user.routes"));

// Manager routes
app.use("/api/manager", require("./routes/manager.routes"));

// Tutor routes
app.use("/api/tutor", require("./routes/tutor.routes"));

// Course routes
app.use("/api/course", require("./routes/course.routes"));

// Job routes (SEE JOB LIST)
app.use("/api", require("./routes/job.routes"));

/* ================================
   Test Route
================================ */

app.get("/", (req, res) => {
  res.send("SmartTutorET API Running...");
});

module.exports = app;