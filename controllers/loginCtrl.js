const authenticate = require("../services/authenticateSrv");

function login(username, password, req, res) {
  console.log("loginCtrl");
  authenticate(username, password, function(err, user) {
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function() {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success =
          "Authenticated as " +
          user.name +
          " click to <a href='/logout'>logout</a>. " +
          " You may now access <a href='/time'>timesheets</a>.";
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " + " username and password." + " (use 'bird' and 'bureau')";
      res.redirect("/");
    }
  });
}

module.exports = login;
