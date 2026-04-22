const Schedule = require('../models/Schedule.model');

// ✅ Create schedule with conflict check
exports.createSchedule = async (req, res) => {
  const { date, startTime, endTime } = req.body;

  const existing = await Schedule.findOne({
    userId: req.user.id,
    date,
    startTime
  });

  if (existing) {
    return res.status(400).json({ message: 'Time conflict!' });
  }

  const schedule = await Schedule.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(schedule);
};

// ✅ Get all schedules
exports.getSchedules = async (req, res) => {
  const schedules = await Schedule.find({ userId: req.user.id });
  res.json(schedules);
};

// ✅ Add task (to-do list)
exports.addTask = async (req, res) => {
  const { scheduleId, title } = req.body;

  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    return res.status(404).json({ message: 'Schedule not found' });
  }

  schedule.tasks.push({ title });
  await schedule.save();

  res.json(schedule);
};

// ✅ Mark task complete
exports.completeTask = async (req, res) => {
  const { scheduleId, taskId } = req.body;

  const schedule = await Schedule.findById(scheduleId);

  const task = schedule.tasks.id(taskId);
  task.completed = true;

  await schedule.save();

  res.json(schedule);
};
exports.deleteSchedule = async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};