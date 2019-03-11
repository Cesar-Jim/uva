const express = require("express");
const router = express.Router();

const wineController = require("../controllers/wineController");

router.get("/wines", wineController.index);
router.get("/wines/new", wineController.new);
router.post("/wines/create", wineController.create);
router.get("/wines/:id", wineController.show);
router.post("/wines/:id/destroy", wineController.destroy);
router.get("/wines/:id/edit", wineController.edit);
router.post("/wines/:id/update", wineController.update);

module.exports = router;
