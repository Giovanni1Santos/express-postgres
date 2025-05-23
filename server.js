require('dotenv').config();
const app = require('./api/app');
const syncDatabase = require('./api/database/syncDatabase');

const PORT = process.env.PORT || 3000;

syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Auth Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });