const Joi = require("joi");
const mongoose = require("mongoose");
const { commentSchema } = require("./comment");

const Food = mongoose.model(
  "Food",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    comment: {
      type: commentSchema,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  })
);

function validateFood(food) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    commentId: Joi.objectId().required(),
  };

  return Joi.validate(food, schema);
}

exports.Food = Food;
exports.validate = validateFood;
