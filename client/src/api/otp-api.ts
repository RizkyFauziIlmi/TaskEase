import { OtpResponse } from "../../types";
import axiosClient from "../lib/axios-client";

const otpApi = {
  requestRecovery: async (email: string) => {
    const response = await axiosClient.post("/otp/request-recovery", { email });

    return response.data as OtpResponse;
  },
  verifyOtp: async (email: string, otp: string) => {
    const response = await axiosClient.post("/otp/verify-otp", { email, otp });

    return response.data as OtpResponse;
  },
  resetPassword: async (email: string, newPassword: string) => {
    const response = await axiosClient.post("/otp/reset-password", {
      email,
      newPassword,
    });

    return response.data as OtpResponse;
  },
};

export default otpApi;
