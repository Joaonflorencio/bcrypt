const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');
const router = express.Router();


const { verifyCredentials } = require('../data/users');

router.post('/login', (req, res) => {
  // Verificar credenciales
  const user = verifyCredentials(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign({ user }, secret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales no válidas');
  }
});

router.get('/dashboard', (req, res) => {
  res.send('Dashboard accesible solo para usuarios autenticados');
});

module.exports = router;