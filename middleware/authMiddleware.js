const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ================= PROTECT ROUTE =================
// Verifies JWT token and attaches user to request

const protect = async (req, res, next) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      return next();
    }

    return res.status(401).json({
      message: "Not authorized, no token"
    });

  } catch (error) {

    return res.status(401).json({
      message: "Token failed"
    });

  }
};



// ================= ADMIN ONLY =================
// Restrict route to admin users

const adminOnly = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Admin only access"
  });

};



// ================= ROLE AUTHORIZATION =================
// Allow only specific roles

const allowRoles = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();

  };

};

// ================= EXPORTS =================

module.exports = {
  protect,
  adminOnly,
  allowRoles
};