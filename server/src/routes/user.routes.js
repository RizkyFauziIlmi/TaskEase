import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import userController from "../controllers/user.controller.js";

const route = Router();

// Get all users
route.get("/all", authenticateToken, userController.getAllUser);

// Get current user
route.get("/", authenticateToken, userController.getCurrentUser);

// Update current user
route.put("/", authenticateToken, userController.updateCurrentUser);

// Toggle admin role
route.put("/toggle-role", authenticateToken, userController.toggleAdminRole);

// Delete specific user
route.delete(
  "/delete-specific-user/:id",
  authenticateToken,
  userController.deleteSpecificUser
);

// User sign up
route.post("/signup", userController.signUp);

// User login
route.post("/login", userController.login);

// User login with Firebase
route.post("/login/firebase", userController.loginWithFirebase);

// User logout
route.put("/logout", authenticateToken, userController.logout);

export default route;
