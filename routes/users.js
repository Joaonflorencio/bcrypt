const express = require('express')
const router = express.Router()
const { generateToken, verifyToken } = require('../middlewares/authMiddleware')
const users = require('../data/users')

//COCRETA!!!

router.get('/', (req, res) => {
  if(req.session.token) {
    res.send(`
    <h1>BIENVENIDO</h1>
    <a href="/dashboard">Dashboard</a>
    <form action="/logout" method="post">
      <button type="submit">LogOut</button> 
    </form>
    `)
  } else {
    res.send(`
    <form action="/login" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">

    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    
    <button type="submit">Entrar</button> 
    </form>
    <a href="/dashboard">Dashboard</a>
  `)
  }
})

router.get('/dashboard', verifyToken, (req, res) => {
  const userId = req.user
  const user = users.find(user => user.id === userId)
  if(user) {
    res.send(`
    <h1>Bienvenido ${user.name}</h1>
    <p>UserName: ${user.username}</p>
    <p>UserId: ${user.id}</p>
    <a href="/">HOME</a>
    <form action="/logout" method="post">
      <button type="submit">LogOut</button> 
    </form>
  `)
  } else {
    res.status(401).json({mensaje: "usuario no encontrado"})
  }  
})

router.post('/login', (req, res) => {
  const {username, password} = req.body
  const user = users.find(user => user.username === username && user.password === password)

  if(user) {
    const token = generateToken(user)
    req.session.token = token
    res.redirect('/dashboard')
  } else {
    res.status(401).json({mensaje: "usuario o contraseña incorrectas"})
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
