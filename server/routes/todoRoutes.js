import express from "express";
import {
  getAllTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllTodos);

router.post("/", verifyToken, createTodo);

router.get("/:id", verifyToken, getTodo);

router.put("/:id", verifyToken, updateTodo);

router.delete("/:id", verifyToken, deleteTodo);

export default router;
