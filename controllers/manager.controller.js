
const User = require('../models/User');                  
const TutorJob = require('../models/TutorJob');  
const TutorApplication = require('../models/TutorApplication');
const { sendTutorApprovalEmail, sendTutorRejectionEmail } = require("../utils/sendEmail"); 

// Manager creates tutor job (example)
exports.createTutorJob = async (req, res) => {
  try {

    const manager = req.user;

    if (manager.role !== "manager") {
      return res.status(403).json({ message: "Only managers can post tutor jobs" });
    }

    const { title, description, subject } = req.body;

    const job = await TutorJob.create({
      title,
      description,
      subject,
      createdBy: manager._id
    });

    res.json({
      message: "Tutor job posted successfully",
      job
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manager approves tutor application
exports.approveTutor = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await TutorApplication.findById(applicationId);

    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = "approved";
    await application.save();

    const user = await User.findById(application.userId);
    user.role = "tutor";
    user.tutorStatus = "approved";
    await user.save();

    await sendTutorApprovalEmail(user.email, user.name);

    res.json({ message: "Tutor approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manager rejects tutor application
exports.rejectTutor = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { reason } = req.body; // optional reason from manager

    const application = await TutorApplication.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = "rejected";
    await application.save();

    const user = await User.findById(application.userId);
    user.tutorStatus = "rejected";
    await user.save();

    // Send rejection email
    await sendTutorRejectionEmail(user.email, user.name, reason);

    res.json({ message: "Tutor application rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all tutor applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await TutorApplication.find().populate('userId', 'name email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};