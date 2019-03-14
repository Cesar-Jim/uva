// When dotenv is configured, it will look for .env in the root and load environment variables into memory.
require("dotenv").config();
const path = require("path");

const viewsFolder = path.join(__dirname, "..", "views");

const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");

module.exports = {
  init(app, express) {
    // init parameters hold the Express app instance and the express instance
    app.set("views", viewsFolder);
    app.set("view engine", "ejs"); // Mount the view engine and tell Express where to find static assets
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1.21e9 } //set cookie to expire in 14 days
      })
    );
    app.use(flash());

    passportConfig.init(app);

    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
  }
};
