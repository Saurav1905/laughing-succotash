const Joi = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = {
    name: Joi.string().min(5).max(250).required(),
  };

  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
