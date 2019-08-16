const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("jwt", { session: false }), function(req, res) {
  console.log("GET api/timesheets");
  res.sendStatus(200);
});

module.exports = router;
