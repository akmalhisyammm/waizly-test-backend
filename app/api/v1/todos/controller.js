const { StatusCodes } = require('http-status-codes');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} = require('../../../services/mongoose/todos');

const index = async (req, res, next) => {
  try {
    const result = await getAllTodos(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getTodoById(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createTodo(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTodo(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const toggle = async (req, res, next) => {
  try {
    const result = await updateTodoStatus(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTodo(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, create, update, toggle, destroy };
