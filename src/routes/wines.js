const express = require("express");
const router = express.Router();

const wineController = require("../controllers/wineController");

router.get("/wines", wineController.index);

module.exports = router;
