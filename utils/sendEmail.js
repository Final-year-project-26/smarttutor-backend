const nodemailer = require("nodemailer");

const sendEmail = async (email, token) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const link = `http://localhost:5000/api/auth/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "SmartTutorET Verification",
    html: `<a href="${link}">Click here to verify your email</a>`
  });

};

module.exports = sendEmail;