const express = require("express");
const {
  listComments,
  deleteReview,
  createReview,
} = require("../controllers/commentControllers");

const router = express.Router();

router.get("/all", listComments);
router.delete("/:id", deleteReview);
router.post("/new-post", createReview);

module.exports = router;
