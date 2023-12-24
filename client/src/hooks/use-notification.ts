import { create } from "zustand";

interface Notification {
  FriendRequest: number;
  setFriendRequest: (num: number) => void;
}

export const useNotification = create<Notification>((set) => ({
  FriendRequest: 0,
  setFriendRequest: (num) => set({ FriendRequest: num }),
}));
