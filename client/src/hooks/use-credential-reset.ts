import { create } from "zustand";

interface CredentialReset {
  email: string;
  otp: string;
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  clear: () => void;
}

export const useCredentialReset = create<CredentialReset>((set) => ({
  email: "",
  otp: "",
  setEmail: (email) => set((state) => ({ ...state, email })),
  setOtp: (otp) => set((state) => ({ ...state, otp })),
  clear: () => set(() => ({ otp: "", email: "" })),
}));
