import { useEffect } from "react";
import useThemeDetector from "./use-theme-detector";
import useLocalStorage from "use-local-storage";

const useTheme = () => {
  const { isDarkTheme } = useThemeDetector();

  const darkThemes = [
    "dark",
    "synthwave",
    "cyberpunk",
    "forest",
    "black",
    "dracula",
    "night",
    "coffee",
    "dim",
    "sunset",
  ];

  const lightThemes = ["light", "retro", "garden", "aqua", "fantasy"];

  const [theme, setTheme] = useLocalStorage<string>(
    "theme",
    isDarkTheme ? "dark" : "light"
  );

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
  };

  function detectThemeVariant(theme: string) {
    return darkThemes.includes(theme)
  }

  const isDarkOrLight = theme === "light" || theme === "dark";
  const isLightVariant = lightThemes.includes(theme);
  const isDarkVariant = darkThemes.includes(theme);

  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document?.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return {
    theme,
    isDarkOrLight,
    isLightVariant,
    detectThemeVariant,
    isDarkVariant,
    changeTheme,
  };
};

export default useTheme;
