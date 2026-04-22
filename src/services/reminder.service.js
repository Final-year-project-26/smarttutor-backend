const cron = require('node-cron');
const Schedule = require('../models/Schedule.model');

const startReminder = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
const currentTime = now.toTimeString().slice(0,5);

    const schedules = await Schedule.find();

   schedules.forEach(s => {
  if (s.startTime === currentTime) {
    console.log(`🔔 Reminder: ${s.title} starting now!`);
  }
});
  });
};

module.exports = startReminder;