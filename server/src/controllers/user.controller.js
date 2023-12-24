import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { sendWelcome } from "../../lib/email.js";

const prisma = new PrismaClient();

const userController = {
  getAllUser: async (req, res) => {
    try {
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const users = await prisma.user.findMany({
        where: {
          NOT: {
            id: { equals: req.user.id },
          },
        },
        include: {
          activities: true,
          todos: true,
          _count: true,
        },
      });

      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: `Get All User Data in Database`,
      //     userId: req.user.id,
      //   },
      // });

      res.status(200).json({ message: "Get data successfully", data: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getCurrentUser: async (req, res) => {
    const { includeTodo, includeActivity } = req.query;

    const isIncludeTodo = includeTodo === "true" ? true : false;
    const isIncludeActivity = includeActivity === "true" ? true : false;

    try {
      const userData = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          todos: isIncludeTodo,
          activities: isIncludeActivity,
        },
      });

      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: `Get current user Data`,
      //     userId: req.user.id,
      //   },
      // });

      res
        .status(200)
        .json({ message: "Get data successfully", data: userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toggleAdminRole: async (req, res) => {
    const { userId } = req.body;

    try {
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: user.role === "ADMIN" ? "MEMBER" : "ADMIN",
        },
      });

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "UPDATE",
          description: `Change ${updatedUser.username} role to ${updatedUser.role}`,
          userId: req.user.id,
        },
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteSpecificUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "DELETE",
          description: `Delete ${user.username} from database`,
          userId: req.user.id,
        },
      });

      res
        .status(200)
        .json({ message: `User with id ${user.id} deleted successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  signUp: async (req, res) => {
    const { username, email, password } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        AND: [{ email }, { method: "EMAIL" }],
      },
    });

    if (userExist) {
      return res.status(403).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Create an new Account`,
          userId: user.id,
        },
      });

      sendWelcome(username, email);

      res
        .status(201)
        .json({ message: "User created successfully", data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credential" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Login`,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });

      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  loginWithFirebase: async (req, res) => {
    const { email, username, imgUrl, method, id } = req.body;

    try {
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            id,
            email,
            username,
            imgUrl,
            method,
          },
        });

        await prisma.activity.create({
          data: {
            table: "USER",
            method: "CREATE",
            description: `Create an new Account`,
            userId: user.id,
          },
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Login`,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });

      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateCurrentUser: async (req, res) => {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: { ...req.body },
      });

      await prisma.activity.create({
        data: {
          table: "USER",
          method: "UPDATE",
          description: `Update current user`,
          userId: req.user.id,
        },
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  logout: async (req, res) => {
    try {
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Logout`,
          userId: req.user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          isOnline: false,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
