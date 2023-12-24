import { Menu } from "lucide-react";
import SidebarComponent from "./sidebar-component";
import { scrollToTopElement } from "../lib/scroll";

export const SidebarMenu = () => {
  return (
    <div className="drawer w-fit z-50 relative">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost btn-sm md:hidden">
          <Menu onClick={() => scrollToTopElement("dashboard")} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-0">
          {/* Sidebar content here */}
          <SidebarComponent className="h-screen bg-base-300 w-72" />
        </ul>
      </div>
    </div>
  );
};
