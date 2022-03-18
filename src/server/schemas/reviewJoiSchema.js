const { Joi } = require("express-validation");

const reviewSchema = {
  body: Joi.object({
    image: Joi.string,
    name: Joi.string,
    review: Joi.string,
    score: Joi.number,
  }),
};

module.exports = reviewSchema;
