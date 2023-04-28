const { celebrate, Joi } = require('celebrate');

const validateCardData = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateCardData,
  validateCardId,
};
