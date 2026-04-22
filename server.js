require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();
const startReminder = require('./src/services/reminder.service');

startReminder();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});