const mongoose = require('mongoose');
const { findUserByCredentials } = require('../utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Аноним',
    minlength: [2, 'Длина имени не должна быть короче двух символов'],
    maxlength: [30, 'Длина имени не должна превышать 30 символов'],
  },
  about: {
    type: String,
    default: 'Остаюсь загадкой',
    minlength: [2, 'Длина описания не должна быть короче двух символов'],
    maxlength: [30, 'Длина описания не должна превышать 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://raw.githubusercontent.com/Tatty13/imgs-for-mesto-project/main/avatar.png',
  },
  email: {
    type: String,
    required: [true, 'email не указан'],
    unique: [true, 'Пользователь с указанным email уже существует'],
  },
  password: {
    type: String,
    required: [true, 'Пароль не указан'],
    minlength: [6, 'Длина пароля не должна быть короче 6 символов'],
  },
});

userSchema.statics = { findUserByCredentials };

module.exports = mongoose.model('user', userSchema);
