import { Router } from "express";
import notificationController from "../controllers/notification.controller.js";

const route = Router();

// Get all notifications
route.get("/", notificationController.getAllNotifications);

export default route;
