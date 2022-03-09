const Comment = require("../../db/models/Comment");

const listComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    next(new Error("No comments"));
  }
};

module.exports = {
  listComments,
};
