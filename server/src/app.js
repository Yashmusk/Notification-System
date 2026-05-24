const express = require('express');
const app = express();
const jobRoutes = require('./routes/job.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('API running');
});
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;