const express = require("express");
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
const passportJwtStrategy = require("./passport");

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
passportJwtStrategy();

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
