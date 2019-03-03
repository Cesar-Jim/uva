const express = require("express");
const router = express.Router();

const staticController = require("../controllers/staticController");

// Defining the route "/". Set the root path to accept a GET request.
router.get("/", staticController.index);
router.get("/about", staticController.about);

module.exports = router;
