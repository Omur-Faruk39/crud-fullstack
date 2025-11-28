import express from "express";
import getTodos from "../controller/getTodosController.js";
import addTodo from "../controller/addTodoController.js";
import deleteTodo from "../controller/deleteTodoController.js";
import updateTodo from "../controller/updateTodoController.js";

const router = express.Router();

// Define your routes here
router
  .get("/", getTodos)
  .post("/", addTodo)
  .delete("/", deleteTodo)
  .patch("/", updateTodo);

export default router;
