const hash = require("pbkdf2-password");
const users = require("../models/userMdl");

function authenticate(name, pass, fn) {
  console.log("authenticating %s:%s", name, pass);
  let user = users[name];
  // query the db for the given username
  if (!user) return fn(new Error("cannot find user"));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function(err, pass, salt, hash) {
    console.log("user found!"); //nothing in hash() gets executed, investigate further.
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(new Error("invalid password"));
  });
}

module.exports = authenticate;
