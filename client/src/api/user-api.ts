import {
  GetUserResponse,
  LoginUserResponse,
  LoginWithFirebaseRequest,
  updateUserRequest,
} from "../../types";
import axiosClient from "../lib/axios-client";

const userApi = {
  logout: async (token: string) => {
    const response = await axiosClient.put("/user/logout", undefined, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response
  },
  getAllUser: async (token: string) => {
    const response = await axiosClient.get("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data as GetUserResponse[] & { length: number };
  },
  getUserData: async (token: string, query: string = "") => {
    const response = await axiosClient.get("/user".concat(query), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data as GetUserResponse;
  },
  updateCurrentUser: async (token: string, newUser: updateUserRequest) => {
    const response = await axiosClient.put("/user", newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },
  toggleRole: async (token: string, userId: string) => {
    const response = await axiosClient.put(
      "/user/toggle-role",
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  },
  deleteSpecificUser: async (token: string, userId: string) => {
    const response = await axiosClient.delete(`/user/delete-specific-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response
  },
  loginWithFirebase: async (body: LoginWithFirebaseRequest) => {
    const response = await axiosClient.post("/user/login/firebase", body);

    return response.data as LoginUserResponse;
  },
};

export default userApi;
