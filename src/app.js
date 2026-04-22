const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/subjects', require('./routes/subject.routes'));
app.use('/api/schedule', require('./routes/schedule.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

module.exports = app;