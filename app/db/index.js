const mongoose = require('mongoose');
const { dbUrl, dbName } = require('../config');

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl, { dbName });

const db = mongoose.connection;

module.exports = db;
