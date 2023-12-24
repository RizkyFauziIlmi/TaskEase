import { CreateTodoRequest, GetAllTodosResponse } from "../../types";
import axiosClient from "../lib/axios-client";

const todoApi = {
  getAllTodos: async (token: string) => {
    const response = await axiosClient.get("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data as GetAllTodosResponse;
  },
  createTodo: async (token: string, newTodo: CreateTodoRequest) => {
    const response = await axiosClient.post(`/todos/todo`, newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  },
  updateTodo: async (
    token: string,
    todoId: string,
    newTodo: CreateTodoRequest
  ) => {
    const response = await axiosClient.put(`/todos/todo/${todoId}`, newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },
  toggleCompleted: async (token: string, todoId: string) => {
    const response = await axiosClient.patch(
      `/todos/todo/${todoId}/toggleCompleted`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  },
  deleteTodo: async (token: string, todoId: string) => {
    const response = await axiosClient.delete(`/todos/todo/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  },
};

export default todoApi;
