import { Router } from "express";
import todoController from "../controllers/todo.controller.js";

const route = Router();

// Create a new todo
route.post("/todo", todoController.createTodo);

// Get the current todo list
route.get("/", todoController.getCurrentTodo);

// Get a single todo by ID
route.get("/todo/:id", todoController.getSingleTodo);

// Update a todo by ID
route.put("/todo/:id", todoController.updateTodo);

// Delete a todo by ID
route.delete("/todo/:id", todoController.deleteTodo);

// Toggle the completed status of a todo by ID
route.patch("/todo/:id/toggleCompleted", todoController.toggleCompleted);

export default route;
