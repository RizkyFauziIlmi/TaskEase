/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "todo-light": "url('./src/assets/light-todo-bg.jpg')",
        "todo-dark": "url('./src/assets/dark-todo-bg.jpg')",
        "todo-space": "url('./src/assets/space-todo-bg.jpg')",
        "todo-yellow": "url('./src/assets/yellow-todo-bg.jpg')",
        "todo-sakura": "url('./src/assets/sakura-todo-bg.jpg')",
        "todo-stork": "url('./src/assets/stork-todo-bg.jpg')",
        "todo-colorfull": "url('./src/assets/colorfull-todo-bg.jpg')",
        "todo-sheet": "url('./src/assets/sheet-todo-bg.jpg')",
        "todo-rollpaper": "url('./src/assets/rollpaper-todo-bg.jpg')",
        "todo-sketch": "url('./src/assets/sketch-todo-bg.jpg')",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "synthwave",
      "retro",
      "cyberpunk",
      "garden",
      "forest",
      "aqua",
      "fantasy",
      "black",
      "dracula",
      "night",
      "coffee",
      "dim",
      "sunset",
    ],
  },
};
