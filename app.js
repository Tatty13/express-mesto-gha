const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6439532f2684df4b44f0a6ea',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {

});
