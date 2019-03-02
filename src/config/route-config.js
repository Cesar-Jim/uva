// This module exports a function that initializes all defined routes

module.exports = {
  init(app) {
    // init loads the defined routes and defines them on the Express object
    const staticRoutes = require("../routes/static");

    app.use(staticRoutes);
  }
};
