import { Router } from "express";
import todoController from "../controllers/todo.controller.js";

const route = Router();

// CREATE TODO
route.post("/todo", todoController.createTodo);

// READ CURRENT TODOS
route.get("/", todoController.getCurrentTodo);

// READ SINGLE TODO
route.get("/todo/:id", todoController.getSingleTodo);

// UPDATE TODO
route.put("/todo/:id", todoController.updateTodo);

// DELETE TODO
route.delete("/todo/:id", todoController.deleteTodo);

// TOGGLE COMPLETED FIELD
route.patch("/todo/:id/toggleCompleted", todoController.toggleCompleted);

export default route;
