const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, 'Todo title is required.'],
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 200,
      required: [true, 'Todo description is required.'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Done'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todosSchema);
