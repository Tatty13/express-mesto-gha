require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const { PORT, BD_URL, limiter } = require('./utils/config');

const app = express();

mongoose.connect(BD_URL, {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {});
