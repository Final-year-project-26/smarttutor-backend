const Course = require("../models/Course");

exports.createCourse = async(req,res)=>{
  const user = req.user;

  if(user.role !== "tutor" || user.tutorStatus !== "approved")
    return res.status(403).json({ message:"Only approved tutors can create courses" });

  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    tutorId: user._id
  });

  res.json({ message:"Course created", course });
};

exports.enrollCourse = async(req,res)=>{
  const user = req.user;
  if(user.role !== "student") return res.status(403).json({ message:"Only students can enroll" });

  const course = await Course.findById(req.params.courseId);
  if(!course) return res.status(404).json({ message:"Course not found" });

  if(course.students.includes(user._id))
    return res.status(400).json({ message:"Already enrolled" });

  course.students.push(user._id);
  await course.save();

  res.json({ message:"Enrolled successfully" });
};