import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import { sendOtpByEmail } from "../../lib/email.js";

const route = Router();
const prisma = new PrismaClient();

const otpController = {
  requestRecovery: async (req, res) => {
    const { email } = req.body;
    
    try {
      // Find User by Email
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }
    
      // Generate OTP
      const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
    
      // Set OTP expiration time to 5 minutes from now
      const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP valid in 5 minutes
    
      if (!user.otp) {
        // Create new OTP record if user doesn't have one
        await prisma.otp.create({
          data: {
            code: otp,
            expiresAt: otpExpirationTime,
            userId: user.id,
          },
        });
    
        // Send OTP to user via email
        sendOtpByEmail(email, otp);
    
        // Return response with success message and data
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      } else if (new Date() > new Date(user.otp.expiresAt)) {
        // Update existing OTP record if it has expired
        const updatedUser = await prisma.otp.update({
          where: {
            userId: user.id,
          },
          data: {
            code: otp,
            expiresAt: otpExpirationTime,
            verified: false,
          },
        });
    
        // Send updated OTP to user via email
        sendOtpByEmail(email, updatedUser.code);
    
        // Return response with success message and data
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      }
    
      // Return response with success message and data
      res.status(201).json({
        message: "OTP has been sent, check the latest email",
        data: { verified: user.otp.verified },
      });
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  verfiyOtp: async (req, res) => {
    const { otp, email } = req.body;
    
    try {
      // Find the user with the given email and method as "EMAIL" and include the otp
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      if (!user) {
        // Return a 404 response if the user is not found
        return res.status(404).json({ message: "User not found" });
      }
    
      if (
        !user.otp ||
        user.otp.code !== otp ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
        // Return a 400 response if the OTP is invalid or has expired
        return res
          .status(400)
          .json({ message: "The OTP is invalid or has expired" });
      }
    
      await prisma.otp.update({
        where: {
          userId: user.id,
        },
        data: {
          verified: true,
        },
      });
    
      // Return a 201 response if the OTP is verified successfully
      res.status(201).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error(error);
      // Return a 500 response if there's an internal server error
      res.status(500).json({ message: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    const { email, newPassword } = req.body;
    
    try {
      // Find user by email and method
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });
    
      // If user doesn't exist, return 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      // Check if OTP exists, is verified, and has not expired
      if (
        !user.otp ||
        !user.otp.verified ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
        return res
          .status(400)
          .json({ message: "The OTP is invalid or has expired" });
      }
    
      // Check if new password matches the existing password
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
    
      // If passwords match, return 409 error
      if (passwordMatch) {
        return res.status(409).json({ message: "Try different password" });
      }
    
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
    
      // Update user's password
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    
      // Delete OTP for the user
      await prisma.otp.delete({
        where: {
          userId: user.id,
        },
      });
    
      // Return success message
      res.status(201).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      // Return error message
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default otpController;