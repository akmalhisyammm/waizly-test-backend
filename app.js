const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const todosRouter = require('./app/api/v1/todos/router');

const notFoundMiddleware = require('./app/middlewares/not-found');
const errorMiddleware = require('./app/middlewares/error');

const BASE_URL_V1 = '/api/v1';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Rikutodo API!',
  });
});

app.use(`${BASE_URL_V1}/todos`, todosRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
