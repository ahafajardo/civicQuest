const passport = require("passport");
const jwt = require("jsonwebtoken");
const users = require("../models/userMdl");

function buildToken(payload) {
  console.log(payload.username);
  let user = users.find(user => user.username == payload.username);
  // query the db for the given username
  if (!user) return { error: "No user found" };
  const token = jwt.sign(user, "veryVerySecretKey");

  return { userId: user.id, token };
}

module.exports = buildToken;
