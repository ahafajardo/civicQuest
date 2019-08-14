const express = require("express");
const router = express.Router();
const login = require("../controllers/loginCtrl");

router.get("/", function(req, res) {
  console.log("GET api/login");
  res.sendStatus(200);
});

router.post("/", function(req, res) {
  console.log(req.body);
  login(req.body.username, req.body.password, req, res);
});

module.exports = router;
