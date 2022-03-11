const Comment = require("../../db/models/Comment");

const listComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    error.message = "no reviews";
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    error.message = "cant delete review";
    next(error);
  }
};

module.exports = {
  listComments,
  deleteReview,
};
