// Each function contains a handler for a particular route.

module.exports = {
  index(req, res, next) {
    res.render("static/index", { title: "Welcome to uva" });
    // render() takes the location of the template and the object containing the data passed in the template
  }
};
