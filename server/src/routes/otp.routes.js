import { Router } from "express";
import otpController from "../controllers/otp.controller.js";

const route = Router();

// requesting recovery
route.post("/request-recovery", otpController.requestRecovery);

// verifying OTP
route.post("/verify-otp", otpController.verfiyOtp);

// resetting password
route.post("/reset-password", otpController.resetPassword);

export default route;
