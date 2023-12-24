import { create } from "zustand";

export enum Status {
  SUCCESS,
  ERROR,
  NONE,
}

interface ErrorValue {
  message: string;
  status: Status;
  setMessage: (message: string) => void;
  setStatus: (status: Status) => void;
  clear: () => void;
}

export const useErrorValue = create<ErrorValue>((set) => ({
  message: "",
  status: Status.NONE,
  setMessage: (message) => set((state) => ({ ...state, message })),
  setStatus: (status) => set((state) => ({ ...state, status })),
  clear: () => set(() => ({ message: "", status: Status.NONE })),
}));
