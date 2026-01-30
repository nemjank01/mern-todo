import Todo from "../models/todoModel.js";
import { createError } from "../utils/error.js";

export async function getAllTodos(req, res, next) {
  const todos = await Todo.find({ userId: req.user.id });

  res.status(200).send(todos);
}

export async function createTodo(req, res, next) {
  const { title } = req.body;

  if (!title) return next(createError(404, "Title is required!"));

  const newTodo = await Todo.create({ title, userId: req.user.id });
  res.status(201).send(newTodo);
}

export async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return next(createError(404, "Todo not found!"));
    if (todo.userId.toString() !== req.user.id)
      return next(createError(404, "Not Authorized"));

    res.status(200).send(todo);
  } catch (err) {
    return next(createError(404, "Todo not found!"));
  }
}

export async function updateTodo(req, res, next) {
  if (!req.body) return next(createError(404, "Missing fields!"));

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return next(createError(404, "Todo not found!"));
    if (todo.userId.toString() !== req.user.id)
      return next(createError(404, "Not Authorized"));

    todo.title = req.body.title || todo.title;

    if (req.body.isComplited !== undefined) {
      todo.isComplited = req.body.isComplited;
    }
    await todo.save();

    res.status(200).json({ message: "Todo updated", todo });
  } catch (error) {
    return next(createError(404, "Todo not found!"));
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo.deletedCount) return next(createError(404, "Todo not found!"));

    res.status(200).json({ message: "Todo deleted!" });
  } catch (error) {
    return next(createError(404, "Todo not found!"));
  }
}
