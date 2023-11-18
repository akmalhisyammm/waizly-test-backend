const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Todo = require('../app/api/v1/todos/model');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

mongoose
  .set('strictQuery', false)
  .connect(`${process.env.MONGODB_URL}`, { dbName: process.env.MONGODB_NAME })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error with code:', err);
  });

const todos = JSON.parse(fs.readFileSync(`${__dirname}/todos.json`, 'utf-8'));

const importData = async () => {
  try {
    await Todo.create(todos);

    console.log('Data imported successfully!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Todo.deleteMany();

    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(
    'Please use the --import or --delete flag to import or delete data. Example: node mocks/migrate --delete'
  );
}
