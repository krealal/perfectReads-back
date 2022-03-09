const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Comment = model("Comment", CommentSchema, "comments");

module.exports = Comment;
