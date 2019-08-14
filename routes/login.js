const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  console.log("Got it");
  res.sendStatus(200);
});

module.exports = router;
