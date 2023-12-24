import { Router } from "express";
import otpController from "../controllers/otp.controller.js";

const route = Router();

route.post("/request-recovery", otpController.requestRecovery);

route.post("/verify-otp", otpController.verfiyOtp);

route.post("/reset-password", otpController.resetPassword);

export default route;
