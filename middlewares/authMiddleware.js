const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(403).send('Token requerido');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Token inválido');
  }
}

module.exports = authMiddleware;