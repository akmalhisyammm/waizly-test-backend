const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
};
