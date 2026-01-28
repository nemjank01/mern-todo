import express from "express";
import {
  getAllTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.get("/:id", getTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
