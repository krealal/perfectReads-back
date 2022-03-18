const express = require("express");
const { validate } = require("express-validation");
const {
  listComments,
  deleteReview,
  createReview,
  updateReview,
} = require("../controllers/commentControllers");
const reviewSchema = require("../schemas/reviewJoiSchema");

const router = express.Router();

router.get("/all", listComments);
router.delete("/:id", deleteReview);
router.post("/new-post", validate(reviewSchema), createReview);
router.put("/:id", updateReview);

module.exports = router;
