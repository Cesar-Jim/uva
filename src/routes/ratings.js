const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");
const validation = require("./validation");

router.get("/wines/:wineId/ratings/new", ratingController.new);
router.post(
  "/wines/:wineId/ratings/create",
  validation.validateRatings,
  ratingController.create
);
router.get("/wines/:wineId/ratings/:id", ratingController.show);
router.post("/wines/:wineId/ratings/:id/destroy", ratingController.destroy);
router.get("/wines/:wineId/ratings/:id/edit", ratingController.edit);
router.post(
  "/wines/:wineId/ratings/:id/update",
  validation.validateRatings,
  ratingController.update
);

module.exports = router;
