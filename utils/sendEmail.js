const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Email verification
const sendEmail = async (email, token) => {
  const link = `${process.env.BASE_URL}/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "SmartTutorET Verification",
    html: `
      <h2>Email Verification</h2>
      <p>Click the button below to verify your account:</p>
      <a href="${link}" style="padding:10px 20px;background:blue;color:white;text-decoration:none;">
        Verify Email
      </a>
      <p>If button doesn't work, use this link:</p>
      <p>${link}</p>
    `
  });
};

// ✅ Tutor approval email
const sendTutorApprovalEmail = async (email, name) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Tutor Approval",
    html: `
      <h2>Congratulations ${name}!</h2>
      <p>Your tutor application has been approved.</p>
    `
  });
};

// ✅ Tutor rejection email
const sendTutorRejectionEmail = async (email, name, reason = "") => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Tutor Application Rejected",
    html: `
      <h2>Hi ${name},</h2>
      <p>We regret to inform you that your tutor application has been rejected.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p>Thank you for your interest in SmartTutorET.</p>
    `
  });
};

module.exports = {
  sendEmail,
  sendTutorApprovalEmail,
  sendTutorRejectionEmail
};