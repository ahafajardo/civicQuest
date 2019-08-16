const express = require("express");
const router = express.Router();
const login = require("../controllers/loginCtrl");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/", function(req, res) {
  console.log("GET api/login");
  res.sendStatus(200);
});

router.post("/", function(req, res) {
  console.log(req.body);
  const payload = login(req.body);
  if (payload.error) res.status(400).json(payload);
  else res.status(200).json(payload);
});

module.exports = router;
