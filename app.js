const express = require("express");
const fs = require("fs");
const https = require("https");
const session = require("express-session");
const bodyParser = require("body-parser");
const authService = require("./services/authenticateSrv");

const app = express();
const port = 3000;
const path = "./build";

const login = require("./routes/login");
const logout = require("./routes/logout");
const time = require("./routes/timesheets");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path));

// middleware
// app.use(
//   session({
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     secret: "shhhh, very secret",
//   }),
// );

authService();

// Session-persisted message middleware
// app.use(function(req, res, next) {
//   var err = req.session.error;
//   var msg = req.session.success;
//   delete req.session.error;
//   delete req.session.success;
//   res.locals.message = "";
//   if (err) res.locals.message = "<p class='msg error'>" + err + "</p>";
//   if (msg) res.locals.message = "<p class='msg success'>" + msg + "</p>";
//   next();
// });

app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/time", time);

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app,
  )
  .listen(port, () => console.log(`Example app listening on port ${port}!`));
