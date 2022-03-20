const { Joi } = require("express-validation");

const reviewSchema = {
  body: Joi.object({
    name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    image: Joi.string(),
    about: Joi.string(),
    email: Joi.string,
  }),
};

module.exports = reviewSchema;
