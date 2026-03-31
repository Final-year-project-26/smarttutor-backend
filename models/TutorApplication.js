const mongoose = require("mongoose");

const tutorApplicationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"TutorJob",
    required: true
  },

  expertise: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum:["pending","approved","rejected"],
    default:"pending"
  }

},{timestamps:true});

module.exports = mongoose.model("TutorApplication", tutorApplicationSchema);