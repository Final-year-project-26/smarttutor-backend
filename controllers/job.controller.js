const TutorJob = require("../models/TutorJob");

exports.getJobs = async (req,res)=>{
  try{

    const jobs = await TutorJob.find();

    res.json(jobs);

  }catch(err){
    res.status(500).json({ message:err.message });
  }
};