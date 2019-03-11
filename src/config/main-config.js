// When dotenv is configured, it will look for .env in the root and load environment variables into memory.
require("dotenv").config();
const path = require("path");

const viewsFolder = path.join(__dirname, "..", "views");

const bodyParser = require("body-parser");

module.exports = {
  init(app, express) {
    // init parameters hold the Express app instance and the express instance
    app.set("views", viewsFolder);
    app.set("view engine", "ejs"); // Mount the view engine and tell Express where to find static assets
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(bodyParser.urlencoded({ extended: true }));
  }
};
