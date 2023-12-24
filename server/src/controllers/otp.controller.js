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
        return res.status(404).json({ message: "User not found" });
      }

      //   Generate OTP
      const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000); // OTP valid in 5 minutes

      if (!user.otp) {
        await prisma.otp.create({
          data: {
            code: otp,
            expiresAt: otpExpirationTime,
            userId: user.id,
          },
        });
        sendOtpByEmail(email, otp);
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      } else if (new Date() > new Date(user.otp.expiresAt)) {
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
        
        sendOtpByEmail(email, updatedUser.code);
        return res.status(201).json({
          message: "OTP has been sent for password recovery",
          data: { verified: false },
        });
      }

      res.status(201).json({
        message: "OTP has been sent, check the latest email",
        data: { verified: user.otp.verified },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  verfiyOtp: async (req, res) => {
    const { otp, email } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (
        !user.otp ||
        user.otp.code !== otp ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
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

      res.status(201).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  resetPassword: async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          AND: [{ email }, { method: "EMAIL" }],
        },
        include: {
          otp: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (
        !user.otp ||
        !user.otp.verified ||
        new Date() > new Date(user.otp.expiresAt)
      ) {
        return res
          .status(400)
          .json({ message: "The OTP is invalid or has expired" });
      }

      const passwordMatch = await bcrypt.compare(newPassword, user.password);

      if (passwordMatch) {
        return res.status(409).json({ message: "Try different password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      await prisma.otp.delete({
        where: {
          userId: user.id,
        },
      });

      res.status(201).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default otpController;