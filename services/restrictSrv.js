function restrict(req, res, next) {
  if (req.session.user) next();
  else {
    req.session.error = "Access Denied!";
    res.redirect("/");
  }
}

module.exports = restrict;
