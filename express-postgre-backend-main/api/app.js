const express = require("express");
const cors = require("cors");

// Cria a instância do app Express
const app = express();

// Middleware para aceitar JSON no body das requisições
app.use(express.json());

// Middleware para permitir requisições de outras origens (CORS)
app.use(cors({
  origin: [
    'https://seu-frontend.vercel.app',
    'http://localhost:3000',
    'https://frontend-integration-express-backend.vercel.app' // ✅ adicionada essa origem
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Importa as rotas
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/to_do.routes");

// Define as rotas base da API
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Rota raiz só pra teste rápido
app.get('/', (req, res) => {
  res.send('To do List rodando 🚀');
});

// Exporta o app para ser usado no server.js
module.exports = app;
