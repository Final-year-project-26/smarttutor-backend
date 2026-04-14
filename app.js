const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

/* ================================
   Global Middlewares
================================ */

// ✅ CORS MUST BE FIRST
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://smarttutor-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

/* ================================
   Routes
================================ */

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/manager", require("./routes/manager.routes"));
app.use("/api/tutor", require("./routes/tutor.routes"));
app.use("/api/course", require("./routes/course.routes"));

// ✅ IMPORTANT: your jobs route
app.use("/api", require("./routes/job.routes"));

/* ================================
   Test Route
================================ */

app.get("/", (req, res) => {
  res.send("SmartTutorET API Running...");
});

module.exports = app;