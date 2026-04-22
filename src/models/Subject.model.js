const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  materials: [String]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);