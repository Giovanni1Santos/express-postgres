const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  // Obter token do cabeçalho Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adicionar o userId decodificado no request para acessar nas rotas
    req.userId = decoded.userId;

    // Passar o controle para a próxima função
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

module.exports = authenticateToken;
