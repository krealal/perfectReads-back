const express = require("express");
const {
  listComments,
  deleteReview,
  createReview,
  updateReview,
} = require("../controllers/commentControllers");

const router = express.Router();

router.get("/all", listComments);
router.delete("/:id", deleteReview);
router.post("/new-post", createReview);
router.put("/:id", updateReview);

module.exports = router;
