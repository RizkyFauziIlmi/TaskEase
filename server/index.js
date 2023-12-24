import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./src/routes/user.routes.js";
import TodoRoutes from "./src/routes/todo.routes.js";
import OtpRoutes from "./src/routes/otp.routes.js";
import FriendsRoutes from "./src/routes/friends.routes.js";
import NotificationRoutes from "./src/routes/notification.routes.js";
import { authenticateToken } from "./src/middlewares/auth.js";
import { limiter } from "./src/middlewares/limiter.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json("TaskEase");
});

app.use("/api/user", UserRoutes);
app.use("/api/todos", authenticateToken, TodoRoutes);
app.use("/api/friends", authenticateToken, FriendsRoutes);
app.use("/api/notifications", authenticateToken, NotificationRoutes);
app.use("/api/otp", OtpRoutes);

app.listen(3000, () => {
  console.log("Listening to http://localhost:3000");
});
