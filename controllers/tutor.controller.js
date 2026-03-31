const TutorApplication = require("../models/TutorApplication");
const User = require("../models/User");

exports.applyTutor = async (req,res)=>{
  try{

    const user = req.user;

    // Only normal users can apply
    if(user.role !== "student"){
      return res.status(403).json({
        message:"Only normal users can apply to become tutors"
      });
    }

    // Prevent multiple applications
    const existing = await TutorApplication.findOne({ userId:user._id });

    if(existing){
      return res.status(400).json({
        message:"You already applied"
      });
    }

    const application = await TutorApplication.create({
      userId:user._id,
      jobId:req.params.jobId, 
      expertise:req.body.expertise,
      experience:req.body.experience
    });

    res.json({
      message:"Application submitted successfully",
      application
    });

  }catch(err){
    res.status(500).json({ message:err.message });
  }
};