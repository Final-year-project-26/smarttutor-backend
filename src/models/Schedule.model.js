const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false }
});

const scheduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  startTime: String,
  endTime: String,
    type: {   // 👈 ADD HERE
    type: String,
    enum: ['personal', 'academic'],
    default: 'personal'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: [taskSchema]
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);