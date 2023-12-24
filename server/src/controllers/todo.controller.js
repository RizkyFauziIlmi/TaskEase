import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todoController = {
  createTodo: async (req, res) => {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          ...req.body,
          userId: req.user.id,
        },
      });

      await prisma.activity.create({
        data: {
          method: "CREATE",
          table: "TODO",
          description: `Create new todo with id ${newTodo.id}`,
          userId: req.user.id,
        },
      });

      res.status(201).json({
        message: "Todo created successfully",
        data: newTodo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getCurrentTodo: async (req, res) => {
    try {
      const todos = await prisma.todo.findMany({
        where: { userId: req.user.id },
        orderBy: [
          {
            completed: "asc",
          },
          { createdAt: "desc" },
        ],
      });

      // await prisma.activity.create({
      //   data: {
      //     method: "READ",
      //     table: "TODO",
      //     description: `Get Current Todo`,
      //     userId: req.user.id,
      //   },
      // });

      if (todos.length === 0) {
        return res.status(404).json({ message: "Todos not found" });
      }

      res.status(200).json({ message: "Get data successfully", data: todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getSingleTodo: async (req, res) => {
    const todoId = req.params.id;

    try {
      const todo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });

      // await prisma.activity.create({
      //   data: {
      //     table: "TODO",
      //     method: "READ",
      //     description: `Get todo with id ${todoId}`,
      //     userId: req.user.id,
      //   },
      // });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Get data successfully", data: todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const { title, description, category, completed } = req.body;

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          title,
          description,
          category,
          completed,
        },
      });

      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: `Update todo with id ${todoId}`,
          userId: req.user.id,
        },
      });

      res
        .status(200)
        .json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteTodo: async (req, res) => {
    const todoId = req.params.id;

    try {
      const isExistTodo = await prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });

      if (!isExistTodo) {
        return res.status(204).json({ message: "No Content" });
      }

      await prisma.todo.delete({
        where: { id: todoId, userId: req.user.id },
      });

      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "DELETE",
          description: `Delete todo with id ${todoId}`,
          userId: req.user.id
        }
      })

      res
        .status(200)
        .json({ message: `Todo with id ${todoId} deleted successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toggleCompleted: async (req, res) => {
    const todoId = req.params.id;

    try {
      const existingTodo = await prisma.todo.findUnique({
        where: { id: todoId, userId: req.user.id },
      });

      if (!existingTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      const updatedTodo = await prisma.todo.update({
        where: { id: todoId, userId: req.user.id },
        data: {
          completed: !existingTodo.completed,
        },
      });

      await prisma.activity.create({
        data: {
          table: "TODO",
          method: "UPDATE",
          description: `Toggle completed todo with id ${todoId}`,
          userId: req.user.id
        }
      })

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
