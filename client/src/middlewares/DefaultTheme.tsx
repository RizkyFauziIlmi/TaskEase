import { useEffect } from "react";
import useTheme from "../hooks/use-theme";

interface DefaultThemeProps {
  children: React.ReactElement;
}

export default function DefaultTheme({ children }: DefaultThemeProps) {
  const { changeTheme, isDarkOrLight } = useTheme();

  useEffect(() => {
    if (!isDarkOrLight) {
        changeTheme("dark");
    }
  }, []);

  return children;
}
