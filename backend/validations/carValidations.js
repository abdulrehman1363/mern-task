const Joi = require('joi');

const carValidation = Joi.object({
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
  }),
  color: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Color is required',
    'string.min': 'Color must be at least 3 characters',
  }),
  model: Joi.string().min(3).max(50).required(),
  make: Joi.string().min(3).max(50).required(),
  registrationNo: Joi.string().required().messages({
    'string.empty': 'Registration number is required',
  }),
});

module.exports = { carValidation };
