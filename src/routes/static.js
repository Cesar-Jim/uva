const express = require("express");
const router = express.Router();

// Defining the route "/". Set the root path to accept a GET request.
router.get("/", (req, res, next) => {
  // next passes control to the next matching route
  res.send("Welcome to uva");
});

module.exports = router;
