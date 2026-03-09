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

/* ================================
   Rate Limiter (Security)
================================ */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: "Too many requests from this IP, please try again later."
});

// Apply rate limiter to all requests
app.use(limiter);

/* ================================
   Routes
================================ */

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

/* ================================
   Test Route
================================ */

app.get("/", (req, res) => {
  res.send("SmartTutorET API Running...");
});

module.exports = app;