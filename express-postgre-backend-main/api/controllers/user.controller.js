const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validação de e-mail simples
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Registrar um novo usuário
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validações básicas
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'E-mail inválido' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
  }

  try {
    // Verificar se e-mail já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 12); // Aumentei o salt rounds para 12

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Gerar token JWT imediatamente após o registro
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: 'Usuário registrado com sucesso', 
      userId: user.id,
      token, // Envia o token no registro também
      name: user.name // Retorna o nome do usuário
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      message: 'Erro ao registrar usuário',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login de usuário
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validações básicas
  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  try {
    // Verificar se usuário existe
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'name', 'email', 'password'] // Seleciona apenas os campos necessários
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' }); // Mesma mensagem para usuário não encontrado/senha inválida
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Remover a senha do objeto user antes de enviar a resposta
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({ 
      message: 'Login realizado com sucesso', 
      token,
      user: userWithoutPassword // Envia informações do usuário (sem a senha)
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      message: 'Erro ao realizar login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
