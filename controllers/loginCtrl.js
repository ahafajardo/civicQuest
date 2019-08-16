const jwt = require("jsonwebtoken");
const authService = require("../services/authenticateSrv");

function buildToken(payload) {
  let user = authService(payload);
  // query the db for the given username
  if (!user) return { error: "No user found" };
  const token = jwt.sign(user, "veryVerySecretKey", { expiresIn: "30m" });

  return { userId: user.id, token };
}

module.exports = buildToken;
