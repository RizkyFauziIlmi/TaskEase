import { create } from "zustand";

interface DefaultModalValue {
  titleDefaultvalue: string;
  descriptionDefaultValue: string;
  categoryDefaultValue: string;
  todoIdDefaultValue: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: string) => void;
  setTodoId: (todoId: string) => void;
  clearState: () => void;
}

export const useDefaultModalValueStore = create<DefaultModalValue>((set) => ({
  titleDefaultvalue: "",
  descriptionDefaultValue: "",
  categoryDefaultValue: "",
  todoIdDefaultValue: "",
  setTitle: (title) => set((state) => ({ ...state, titleDefaultvalue: title })),
  setDescription: (description) =>
    set((state) => ({ ...state, descriptionDefaultValue: description })),
  setCategory: (category) =>
    set((state) => ({ ...state, categoryDefaultValue: category })),
  setTodoId: (todoId) =>
    set((state) => ({ ...state, todoIdDefaultValue: todoId })),
  clearState: () =>
    set(() => ({
      categoryDefaultValue: "",
      titleDefaultvalue: "",
      descriptionDefaultValue: "",
      todoIdDefaultValue: "",
    })),
}));
