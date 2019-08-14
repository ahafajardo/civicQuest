const express = require("express");
const fs = require("fs");
const https = require("https");
const app = express();
const port = 3000;
const path = "./build";

const login = require("./routes/login");

app.use(express.static(path));

app.use("/api/login", login);

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app,
  )
  .listen(port, () => console.log(`Example app listening on port ${port}!`));
