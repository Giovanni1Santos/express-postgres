const Todo = require('../models/To_do');

// Criar uma nova tarefa
module.exports.createTodo = async (req, res) => {
  const { title, description, done = false } = req.body;
  const userId = req.userId;

  // Validação básica
  if (!title) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  try {
    const todo = await Todo.create({ 
      title, 
      description, 
      done: Boolean(done), // Garante que é booleano
      userId 
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ 
      message: 'Erro ao criar tarefa',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Listar todas as tarefas do usuário autenticado
module.exports.getTodos = async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await Todo.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']] // Ordena por data de criação
    });
    
    // Caso não encontre tarefas, retorna array vazio (200) em vez de 404
    res.status(200).json(todos || []);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ 
      message: 'Erro ao listar tarefas',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Buscar uma tarefa específica por ID
module.exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const todo = await Todo.findOne({ 
      where: { id, userId },
      attributes: { exclude: ['userId'] } // Não retorna o userId na resposta
    });

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ 
      message: 'Erro ao buscar tarefa',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Atualizar uma tarefa
module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;
  const userId = req.userId;

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Atualiza apenas os campos fornecidos
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (done !== undefined) todo.done = Boolean(done); // Garante valor booleano

    await todo.save();
    
    res.status(200).json(todo);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ 
      message: 'Erro ao atualizar tarefa',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Deletar uma tarefa
module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ 
      message: 'Erro ao deletar tarefa',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};