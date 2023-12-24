import { ReactNode } from "react";
import SidebarComponent from "../components/sidebar-component";
import useTheme from "../hooks/use-theme";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { isDarkOrLight } = useTheme();
  return (
    <div
      className={`flex h-screen w-screen ${
        isDarkOrLight
          ? "bg-base-300"
          : "bg-gradient-to-tr from-base-100/0 via-primary/40 to-primary"
      }`}
    >
        <SidebarComponent className="hidden md:block w-[25%]" />
      {children}
    </div>
  );
}
