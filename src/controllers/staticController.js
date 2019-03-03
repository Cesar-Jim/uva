// Each function contains a handler for a particular route.

module.exports = {
  index: function(req, res, next) {
    res.render("static/index", { title: "Welcome to uva" });
    // render() takes the location of the template and the object containing the data passed in the template
  },
  about: function(req, res, next) {
    res.render("static/about-us", { title: "About Us" });
  }
};
