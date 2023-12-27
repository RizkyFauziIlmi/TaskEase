import { create } from "zustand";

interface TabState {
  state: number;
  setState: (num: number) => void;
}

export const useTabState = create<TabState>((set) => ({
  state: 0,
  setState: (num) => set({ state: num }),
}));
