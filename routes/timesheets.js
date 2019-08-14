const express = require("express");
const router = express.Router();
const restrict = require("../services/restrictSrv");

router.get("/", restrict, function(req, res) {
  console.log("GET api/timesheets");
  res.sendStatus(200);
});

module.exports = router;
