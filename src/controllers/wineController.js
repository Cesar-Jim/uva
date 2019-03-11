// Import queries.wines.js to use the methods defined in it:
const wineQueries = require("../db/queries.wines");

module.exports = {
  index(req, res, next) {
    wineQueries.getAllWines((err, wines) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("wines/index", { wines }); // {wines} is the array of wines expected to receive
      }
    });
  },

  new(req, res, next) {
    res.render("wines/new");
  },

  create(req, res, next) {
    let newWine = {
      name: req.body.name,
      country: req.body.country,
      picture: req.body.picture,
      price: req.body.price,
      variety: req.body.variety,
      alcohol: req.body.alcohol,
      poq: req.body.poq,
      body: req.body.body,
      taste: req.body.taste,
      looks: req.body.looks,
      comments: req.body.comments,
      avgRating: req.body.avgRating
    };

    wineQueries.addWine(newWine, (err, wine) => {
      if (err) {
        res.redirect(500, "/wines/new"); // Status 500: The server cannot process the request
      } else {
        res.redirect(303, `/wines/${wine.id}`);
      }
    });
  },

  show(req, res, next) {
    wineQueries.getWine(req.params.id, (err, wine) => {
      if (err || wine == null) {
        res.redirect(404, "/");
      } else {
        res.render("wines/show", { wine });
      }
    });
  },

  destroy(req, res, next) {
    wineQueries.deleteWine(req.params.id, (err, wine) => {
      if (err) {
        res.redirect(500, `/wines/${wine.id}`);
      } else {
        res.redirect(303, "/wines");
      }
    });
  },

  edit(req, res, next) {
    wineQueries.getWine(req.params.id, (err, wine) => {
      if (err || wine == null) {
        res.redirect(404, "/"); // Status code 404 = not found
      } else {
        res.render("wines/edit", { wine });
      }
    });
  },

  update(req, res, next) {
    wineQueries.updateWine(req.params.id, req.body, (err, wine) => {
      if (err || wine == null) {
        res.redirect(404, `/wines/${req.params.id}/edit`);
      } else {
        res.redirect(`/wines/${wine.id}`);
      }
    });
  }
};
