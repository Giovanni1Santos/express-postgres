require('dotenv').config();
const app = require('./api/app');
const syncDatabase = require('./api/database/syncDatabase');

const PORT = process.env.PORT || 3000;

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
});
