const Todos = require('../../api/v1/todos/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllTodos = async () => {
  const res = await Todos.find();

  return res;
};

const getTodosByStatus = async (req) => {
  const { status } = req.params;

  const res = await Todos.find({ status });

  if (!res) {
    throw new NotFoundError('Todo not found.');
  }

  return res;
};

const createTodo = async (req) => {
  const { title } = req.body;

  const res = await Todos.create({ title, status: 'Pending' });

  return res;
};

const updateTodoTitle = async (req) => {
  const { id } = req.params;
  const { title } = req.body;

  const check = await Todos.findOne({ _id: { $ne: id }, title });

  if (check) {
    throw new BadRequestError('Todo already exist.');
  }

  const res = await Todos.findOneAndUpdate(
    { _id: id },
    { title },
    { new: true, runValidators: true }
  );

  if (!res) {
    throw new NotFoundError('Todo not found.');
  }

  return res;
};

const updateTodoStatus = async (req) => {
  const { id } = req.params;
  const { status } = req.body;

  const res = await Todos.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true, runValidators: true }
  );

  if (!res) {
    throw new NotFoundError('Todo not found.');
  }

  return res;
};

const deleteTodo = async (req) => {
  const { id } = req.params;

  const result = await Todos.findOneAndRemove({ _id: id });

  if (!result) {
    throw new NotFoundError('Todo not found.');
  }

  return result;
};

module.exports = {
  getAllTodos,
  getTodosByStatus,
  createTodo,
  updateTodoTitle,
  updateTodoStatus,
  deleteTodo,
};
