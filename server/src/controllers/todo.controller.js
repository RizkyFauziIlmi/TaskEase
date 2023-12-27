import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todoController = {
  createTodo: async (req, res) => {
    try {
      // Create a new todo in the database
      const newTodo = await prisma.todo.create({
        data: {
          ...req.body,
          userId: req.user.id,
        },
      });

      // Create an activity log for the todo creation
      await prisma.activity.create({
        data: {
          method: "CREATE",
          table: "TODO",
          description: `Create new todo with id ${newTodo.id}`,
          userId: req.user.id,
        },
      });

      // Send a response indicating success and the created todo
      res.status(201).json({
        message: "Todo created successfully",
        data: newTodo,
      });
    } catch (error) {
      // Handle any errors that occur during the creation process
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getCurrentTodo: async (req, res) => {
    try {
      // Fetch todos from the database for the current user
      const todos = await prisma.todo.findMany({
        where: { userId: req.user.id },
        orderBy: [
          {
            completed: "asc",
          },
          { createdAt: "desc" },
        ],
      });

      // Check if any todos were found
      if (todos.length === 0) {
        // Return a 404 response if no todos were found
        return res.status(404).json({ message: "Todos not found" });
      }

      // Return the todos in the response
      res.status(200).json({ message: "Get data successfully", data: todos });
    } catch (error) {
      // Handle any errors that occur during the execution of the code
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getSingleTodo: async (req, res) => {
    const todoId = req.params.id;

    try {
      // Retrieve the todo corresponding to the provided id and user id
      const todo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });

      // * Disable due to database resource
      // Create an activity log entry for reading the todo
      // await prisma.activity.create({
      //   data: {
      //     table: "TODO",
      //     method: "READ",
      //     description: `Get todo with id ${todoId}`,
      //     userId: req.user.id,
      //   },
      // });

      // If the todo is not found, return a 404 error
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Return a success response with the todo data
      res.status(200).json({ message: "Get data successfully", data: todo });
    } catch (error) {
      console.log(error);
      // Return a generic error message for any exceptions
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const { title, description, category, completed } = req.body;

    try {
      // Update the todo in the database
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          title,
          description,
          category,
          completed,
        },
      });

      // Create an activity record for the todo update
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: `Update todo with id ${todoId}`,
          userId: req.user.id,
        },
      });

      // Return successful response
      res
        .status(200)
        .json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
      console.error(error);
      // Return error response
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteTodo: async (req, res) => {
    const todoId = req.params.id;

    try {
      // Check if the todo exists
      const isExistTodo = await prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });

      if (!isExistTodo) {
        // If the todo doesn't exist, return a 204 No Content response
        return res.status(204).json({ message: "No Content" });
      }

      // Delete the todo
      await prisma.todo.delete({
        where: { id: todoId, userId: req.user.id },
      });

      // Create an activity record for the deletion
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "DELETE",
          description: `Delete todo with id ${todoId}`,
          userId: req.user.id,
        },
      });

      // Return a 200 OK response with a success message
      res
        .status(200)
        .json({ message: `Todo with id ${todoId} deleted successfully` });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toggleCompleted: async (req, res) => {
    const todoId = req.params.id;

    try {
      // Check if the todo exists and belongs to the user
      const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });

      // If the todo does not exist, return a 404 error
      if (!existingTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Update the completed field of the todo
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          completed: !existingTodo.completed,
        },
      });

      // Create an activity log for the todo update
      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: `Toggle completed todo with id ${todoId}`,
          userId: req.user.id,
        },
      });

      // Return a success message and the updated todo
      res.status(200).json({
        message: "Completed field toggled successfully",
        todo: updatedTodo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default todoController;
