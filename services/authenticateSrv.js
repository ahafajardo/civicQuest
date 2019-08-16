const users = require("../models/userMdl");

function authService(attempt) {
  let user = users.find(user => user.username == attempt.username && user.password == attempt.password);
  return user;
}

module.exports = authService;
