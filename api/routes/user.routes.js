//responsável pelas rotas de cadastro, Login...

const express = require("express");
const router = express.Router();
// Importa os controllers responsáveis
const userController = require("../controllers/user.controller");

// Rota para registro de novo usuário
router.post("/register", userController.register);

// Rota para login
router.post("/login", userController.login);

module.exports = router;
