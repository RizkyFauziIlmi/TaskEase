import { Database, Server } from "lucide-react";
import IconReact from "../components/svg/react-svg";
import { ReactNode } from "react";
import { NavbarLandingComponent } from "../components/navbar-landing-component";

interface DocumentationLayoutProps {
  children: ReactNode;
}

export default function DocumentationLayout({
  children,
}: DocumentationLayoutProps) {
  return (
    <>
      <NavbarLandingComponent isDocumentation />
      <div className="flex">
        {/* sidebar */}
        <div className="bg-base-200 shadow-lg w-[30%] h-screen">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" checked />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <Database className="h4 w-4" /> Database
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <Server className="h4 w-4" /> Backend
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <IconReact className="h4 w-4" /> Frontend
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="bg-base-100 w-[70%] h-screen overflow-y-auto flex flex-col justify-start items-center p-4 gap-2">
          {children}
        </div>
      </div>
    </>
  );
}
