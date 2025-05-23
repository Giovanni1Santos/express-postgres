const sequelize = require('./sequelize');
require('../models/User');
require('../models/To_do');

const syncDatabase = async () => {
  try {
    // Força a recriação das tabelas (apenas em desenvolvimento)
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    console.log('✅ Banco de dados sincronizado');
  } catch (error) {
    console.error('❌ Erro ao sincronizar o banco de dados:', error);
    throw error;
  }
};

module.exports = syncDatabase;