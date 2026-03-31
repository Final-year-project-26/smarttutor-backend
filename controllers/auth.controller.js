const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

// Register
exports.register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    let userRole = "student";

    if (role === "tutor") {
      userRole = "tutor";
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      role: userRole,
      verificationToken
    });

    await sendEmail(user.email, verificationToken);

    res.status(201).json({
      message: "User registered. Verify email.",
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Login
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify email first" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.verifyEmail = async (req, res) => {

  const user = await User.findOne({
    verificationToken: req.params.token
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;

  await user.save();

  res.json({ message: "Email verified successfully" });

};




// Forgot Password
exports.forgotPassword = async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;

  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendEmail(user.email, token);

  res.json({ message: "Password reset email sent" });

};



// Reset Password
exports.resetPassword = async (req, res) => {

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });

};