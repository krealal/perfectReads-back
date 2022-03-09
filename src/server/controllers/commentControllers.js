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

module.exports = {
  listComments,
};
