const users = require('./users.json');
const bcrypt = require('bcrypt');

function verifyCredentials(username, password) {
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = { verifyCredentials };