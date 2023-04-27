const { celebrate, Joi } = require('celebrate');

const validateUserId = celebrate({
  params: Joi.object({
    id: Joi.string().alphanum().length(24),
  }),
});

const validateUserCredential = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object({
    avatar: Joi.string().uri(),
  }),
});

module.exports = {
  validateUserId,
  validateUserCredential,
  validateUserInfo,
  validateUserAvatar,
};
