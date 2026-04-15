const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

/* ================= CORS ================= */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://smarttutor-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ================= RATE LIMIT ================= */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/manager", require("./routes/manager.routes"));
app.use("/api/tutor", require("./routes/tutor.routes"));
app.use("/api/course", require("./routes/course.routes"));
app.use("/api/jobs", require("./routes/job.routes"));

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.json({ message: "SmartTutor API Running" });
});

module.exports = app;