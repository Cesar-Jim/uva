module.exports = {
  validateRatings(req, res, next) {
    if (req.method === "POST") {
      req
        .checkParams("wineId", "must be valid")
        .notEmpty()
        .isInt();
      req.checkBody("poq", "must be an integer number").isInt();
      req.checkBody("body", "must be an integer number").isInt();
      req.checkBody("taste", "must be an integer number").isInt();
      req.checkBody("looks", "must be an integer number").isInt();
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  },

  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 });
      req
        .checkBody("passwordConfirmation", "must match password provided")
        .optional()
        .matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
};
