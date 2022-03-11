const express = require("express");
const {
  listComments,
  deleteReview,
} = require("../controllers/commentControllers");

const router = express.Router();

router.get("/all", listComments);
router.delete("/:id", deleteReview);

module.exports = router;
