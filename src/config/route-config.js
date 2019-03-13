// This module exports a function that initializes all defined routes

module.exports = {
  init(app) {
    // init loads the defined routes and defines them on the Express object
    const staticRoutes = require("../routes/static");
    const wineRoutes = require("../routes/wines");
    const ratingRoutes = require("../routes/ratings");

    app.use(staticRoutes);
    app.use(wineRoutes);
    app.use(ratingRoutes);
  }
};
