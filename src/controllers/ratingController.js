const ratingQueries = require("../db/queries.ratings.js");

module.exports = {
  new(req, res, next) {
    res.render("ratings/new", { wineId: req.params.wineId });
  },

  create(req, res, next) {
    let newRating = {
      poq: req.body.poq,
      body: req.body.body,
      taste: req.body.taste,
      looks: req.body.looks,
      comments: req.body.comments,
      avgRating: req.body.avgRating,
      wineId: req.params.wineId
    };

    ratingQueries.addRating(newRating, (err, rating) => {
      if (err) {
        res.redirect(500, "/ratings/new");
      } else {
        res.redirect(303, `/wines/${newRating.wineId}/ratings/${rating.id}`);
      }
    });
  },

  show(req, res, next) {
    ratingQueries.getRating(req.params.id, (err, rating) => {
      if (err || rating == null) {
        res.redirect(404, "/");
      } else {
        res.render("ratings/show", { rating });
      }
    });
  },

  destroy(req, res, next) {
    ratingQueries.deleteRating(req, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(
          500,
          `/wines/${req.params.wineId}/ratings/${req.params.id}`
        );
      } else {
        res.redirect(303, `/wines/${req.params.wineId}`);
      }
    });
  },

  edit(req, res, next) {
    ratingQueries.getRating(req.params.id, (err, rating) => {
      if (err || rating == null) {
        res.redirect(404, `/`);
      } else {
        res.render("ratings/edit", { rating });
      }
    });
  },

  update(req, res, next) {
    ratingQueries.updateRating(req.params.id, req.body, (err, rating) => {
      if (err || rating == null) {
        res.redirect(
          404,
          `/wines/${req.params.wineId}/ratings/${req.params.id}/edit`
        );
      } else {
        res.redirect(`/wines/${req.params.wineId}/ratings/${req.params.id}`);
      }
    });
  }
};
