const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/user.routes'));

// Health check
app.get('/', (req, res) => {
  res.send('Auth Service 🛡️');
});

module.exports = app;