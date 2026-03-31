exports.createCourse = async (req,res)=>{
  if(req.user.role !== "tutor")
    return res.status(403).json({ message:"Only tutors can create courses" });

  if(req.user.tutorStatus !== "approved")
    return res.status(403).json({ message:"Tutor not approved" });

  // proceed to create course
  res.json({ message:"Course created" });
};