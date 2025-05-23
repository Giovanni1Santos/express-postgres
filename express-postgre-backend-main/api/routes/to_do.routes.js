// routes/to_do.routes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware');
const todoController = require('../controllers/to_do.controller');

// Aplica o middleware de autenticação em todas as rotas de todos
router.use(authenticateToken);

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

