const Todos = require('../../api/v1/todos/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllTodos = async () => {
  const res = await Todos.find();

  return res;
};

const getTodoById = async (req) => {
  const { id } = req.params;

  const res = await Todos.findById(id);

  if (!res) {
    throw new NotFoundError('Todo not found.');
  }

  return res;
};

const createTodo = async (req) => {
  const { title, description, author, deadline } = req.body;

  const res = await Todos.create({ title, description, author, deadline, status: 'Pending' });

  return res;
};

const updateTodo = async (req) => {
  const { id } = req.params;
  const { title, description, author, deadline } = req.body;

  const check = await Todos.findOne({ _id: { $ne: id }, title, description, author, deadline });

  if (check) {
    throw new BadRequestError('Todo already exist.');
  }

  const res = await Todos.findOneAndUpdate(
    { _id: id },
    { title, description, author, deadline },
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
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
