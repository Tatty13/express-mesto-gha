const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя не получено'],
    minlength: [2, 'Длина имени не должна быть короче двух символов'],
    maxlength: [30, 'Длина имени не должна превышать 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Описание пользователя не получено'],
    minlength: [2, 'Длина описания не должна быть короче двух символов'],
    maxlength: [30, 'Длина описания не должна превышать 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Аватар пользователя не получен'],
  },
});

module.exports = mongoose.model('user', userSchema);
