const hash = require("pbkdf2-password");
const users = require("../models/userMdl");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

function authSetup() {
  // passport.use(
  //   new LocalStrategy(function(username, password, done) {
  //     console.log("authenticating %s:%s", username, password);
  //     let user = users[username];
  //     // query the db for the given username
  //     if (!user) return done(new Error("cannot find user"), false);
  //     // apply the same algorithm to the POSTed password, applying
  //     // the hash against the pass / salt, if there is a match we
  //     // found the user

  //     console.log("user found!"); //nothing in hash() gets executed, investigate further.
  //     if (user) return done(null, user);
  //     else return done(null, false);
  //   }),
  // );

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "veryVerySecretKey",
    // issuer: "https://localhost:3000/",
    // audience: "https://localhost:3000/",
    // expiresIn: "30m",
    // algorithms: ["HS256"],
  };

  passport.use(
    new JwtStrategy(options, function(jwt_payload, done) {
      console.log(`authenticating ${jwt_payload.id}`);
      let user = users.find(user => user.id == jwt_payload.id);
      // query the db for the given username
      if (!user) return done(new Error("cannot find user"), false);
      // apply the same algorithm to the POSTed password, applying
      // the hash against the pass / salt, if there is a match we
      // found the user

      console.log("user found!"); //nothing in hash() gets executed, investigate further.
      if (user) return done(null, user);
      else return done(null, false);
    }),
  );
}

module.exports = authSetup;
