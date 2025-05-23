const sequelize = require('./sequelize');
const User = require('../models/User'); 

module.exports = async () => {
  try {
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synced');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};