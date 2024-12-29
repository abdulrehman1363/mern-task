const Joi = require('joi');

const categoryValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Category name is required',
    'string.min': 'Category name must be at least 3 characters',
    'string.max': 'Category name cannot exceed 50 characters',
  }),
});

module.exports = { categoryValidation };
