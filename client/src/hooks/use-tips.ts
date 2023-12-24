import { create } from "zustand";
import { getRandomNumber } from "../lib/calculate";

interface Tips {
  tip: string;
  tips: string[];
  getRandom: () => void;
}

export const useTips = create<Tips>((set) => ({
  tips: ["Tips: You can export your data in Dashboard page"],
  tip: "",
  getRandom: () =>
    set((state) => ({
      tip: state.tips[getRandomNumber(0, state.tips.length - 1)],
    })),
}));
