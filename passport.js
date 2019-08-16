const users = require("./models/userMdl");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

function authSetup() {
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
      let user = users.find(user => user.id == jwt_payload.id);

      if (!user) return done(new Error("cannot find user"), false);

      console.log("user found!");
      if (user) return done(null, user);
      else return done(null, false);
    }),
  );
}

module.exports = authSetup;
