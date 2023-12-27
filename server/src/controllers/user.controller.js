import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { sendWelcome } from "../../lib/email.js";

const prisma = new PrismaClient();

const userController = {
  getAllUser: async (req, res) => {
    try {
      // Check if the user is an admin
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        // Return 401 Unauthorized status if the user is not an admin
        return res.status(401).json({ message: "Unauthorized!" });
      }

      // Retrieve all users from the database
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

      // * Disable due to database resource
      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: `Get All User Data in Database`,
      //     userId: req.user.id,
      //   },
      // });

      // Return 200 OK status and the retrieved users
      res.status(200).json({ message: "Get data successfully", data: users });
    } catch (error) {
      // Log any errors to the console
      console.log(error);
      // Return 500 Internal Server Error status if an error occurs
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getCurrentUser: async (req, res) => {
    // Retrieve the values of includeTodo and includeActivity from the request query
    const { includeTodo, includeActivity } = req.query;

    // Convert the values to boolean
    const isIncludeTodo = includeTodo === "true" ? true : false;
    const isIncludeActivity = includeActivity === "true" ? true : false;

    try {
      // Retrieve user data from the database
      const userData = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          // Include todos if isIncludeTodo is true
          todos: isIncludeTodo,
          // Include activities if isIncludeActivity is true
          activities: isIncludeActivity,
        },
      });

      // * Disable due to database resource
      // Create an activity record in the database
      // await prisma.activity.create({
      //   data: {
      //     table: "USER",
      //     method: "READ",
      //     description: `Get current user Data`,
      //     userId: req.user.id,
      //   },
      // });

      // Return the retrieved user data as a response
      res
        .status(200)
        .json({ message: "Get data successfully", data: userData });
    } catch (error) {
      console.log(error);
      // Return an error response if an error occurs
      res.status(500).json({ message: "Internal server error" });
    }
  },
  toggleAdminRole: async (req, res) => {
    const { userId } = req.body;

    try {
      // Check if user is an admin
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        // If user is not an admin, return unauthorized status
        return res.status(401).json({ message: "Unauthorized!" });
      }

      // Find the user with the specified ID
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        // If user is not found, return not found status
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user's role
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: user.role === "ADMIN" ? "MEMBER" : "ADMIN",
        },
      });

      // Create an activity record for the user update
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "UPDATE",
          description: `Change ${updatedUser.username} role to ${updatedUser.role}`,
          userId: req.user.id,
        },
      });

      // Return success status and updated user information
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      // Handle any errors that occur during the update process
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteSpecificUser: async (req, res) => {
    const userId = req.params.id;

    try {
      // Check if the user is an admin
      const isAdmin = req.user.role === "ADMIN";

      if (!isAdmin) {
        // Return unauthorized response if the user is not an admin
        return res.status(401).json({ message: "Unauthorized!" });
      }

      // Find the user by ID
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        // Return not found response if the user doesn't exist
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      // Create an activity log entry for the user deletion
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "DELETE",
          description: `Delete ${user.username} from database`,
          userId: req.user.id,
        },
      });

      // Return success response
      res
        .status(200)
        .json({ message: `User with id ${user.id} deleted successfully` });
    } catch (error) {
      // Log and return internal server error if an error occurs
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  signUp: async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user with the given email already exists
    const userExist = await prisma.user.findFirst({
      where: {
        AND: [{ email }, { method: "EMAIL" }],
      },
    });

    if (userExist) {
      return res.status(403).json({ message: "Email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Log the activity of creating a new user
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Create a new Account`,
          userId: user.id,
        },
      });

      // Send a welcome email to the user
      sendWelcome(username, email);

      // Return success response with the created user data
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
      // Find the user by email and method
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
      });

      // If no user is found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the password does not match, return a 401 error
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Credential" });
      }

      // Generate a JWT token with user id and role
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      // Create an activity record for the user login
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Login`,
          userId: user.id,
        },
      });

      // Set user's online status to true
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });

      // Return a success message with the generated token
      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      // If an error occurs, return a 500 error
      res.status(500).json({ message: "Internal server error" });
    }
  },
  loginWithFirebase: async (req, res) => {
    const { email, username, imgUrl, method, id } = req.body;

    try {
      // Find the user by id
      let user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        // Create a new user if user is not found
        user = await prisma.user.create({
          data: {
            id,
            email,
            username,
            imgUrl,
            method,
          },
        });

        // Log activity for user creation
        await prisma.activity.create({
          data: {
            table: "USER",
            method: "CREATE",
            description: `Create a new Account`,
            userId: user.id,
          },
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      // Log activity for user login
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Login`,
          userId: user.id,
        },
      });

      // Update user's online status
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isOnline: true,
        },
      });

      // Return success response with token
      res.status(200).json({ message: "Login successful", data: { token } });
    } catch (error) {
      console.log(error);
      // Return error response
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateCurrentUser: async (req, res) => {
    try {
      // Update the user's information
      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: { ...req.body },
      });

      // Create an activity record for the user update
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "UPDATE",
          description: `Update current user`,
          userId: req.user.id,
        },
      });

      // Send a success response with the updated user information
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      // Handle any errors that occur during the update process
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  logout: async (req, res) => {
    try {
      // Update the isOnline status of the user to false
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          isOnline: false,
        },
      });

      // Create a new activity record for the user
      await prisma.activity.create({
        data: {
          table: "USER",
          method: "CREATE",
          description: `Logout`,
          userId: req.user.id,
        },
      });
    } catch (error) {
      // Log any errors that occur during the update or create operations
      console.log(error);
      // Return a 500 Internal Server Error response to the client
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
