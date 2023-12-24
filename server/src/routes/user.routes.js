import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js";
import userController from "../controllers/user.controller.js";

const route = Router();

// GET ALL USER
route.get("/all", authenticateToken, userController.getAllUser);

// GET CURRENT USER
route.get("/", authenticateToken, userController.getCurrentUser);

// UPDATE CURRENT USER
route.put("/", authenticateToken, userController.updateCurrentUser);

route.put("/toggle-role", authenticateToken, userController.toggleAdminRole);

// DELETE SPESICIFIC USER
route.delete(
  "/delete-specific-user/:id",
  authenticateToken,
  userController.deleteSpecificUser
);

route.post("/signup", userController.signUp);

route.post("/login", userController.login);
route.post("/login/firebase", userController.loginWithFirebase);
route.put("/logout", authenticateToken, userController.logout);

export default route;
