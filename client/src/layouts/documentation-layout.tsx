import { Bell, Database, Lock, Server, User, Users } from "lucide-react";
import IconReact from "../components/svg/react-svg";
import { ReactNode } from "react";
import { NavbarLandingComponent } from "../components/navbar-landing-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabState } from "../hooks/use-tab-state";
import IconTodoLine from "../components/svg/todo-line-svg";

interface DocumentationLayoutProps {
  children: ReactNode;
}

export default function DocumentationLayout({
  children,
}: DocumentationLayoutProps) {
  const { setState, state } = useTabState();
  const navigate = useNavigate();
  const location = useLocation();

  const isDatabaseOverviewRoute =
    location.pathname === "/documentation/database-overview";
  const isBackendTechnologyRoute =
    location.pathname === "/documentation/backend-technology";
  const isBackendArchitectureRoute =
    location.pathname === "/documentation/backend-architecture";
  const isBackendApiUserRoute =
    location.pathname === "/documentation/backend-api/user";
  const isBackendApiTodoRoute =
    location.pathname === "/documentation/backend-api/todo";
  const isBackendApiOtpRoute =
    location.pathname === "/documentation/backend-api/otp";
  const isBackendApiFriendsRoute =
    location.pathname === "/documentation/backend-api/friends";
  const isBackendApiNotificationRoute =
    location.pathname === "/documentation/backend-api/notification";
  const isBackendApiRoute =
    location.pathname === "/documentation/backend-api" ||
    isBackendApiUserRoute ||
    isBackendApiTodoRoute ||
    isBackendApiOtpRoute ||
    isBackendApiFriendsRoute ||
    isBackendApiNotificationRoute;
  const isBackendMiddlewareRoute =
    location.pathname === "/documentation/backend-middleware";

  return (
    <>
      <NavbarLandingComponent isDocumentation />
      <div className="flex">
        {/* sidebar */}
        <div className="bg-base-200 shadow-lg w-[25%] h-screen">
          <div className="join join-vertical w-full">
            <div
              className="collapse collapse-arrow join-item border border-base-300"
              onClick={() => setState(0)}
            >
              <input type="radio" name="my-accordion-4" checked={state === 0} />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <Database className="h4 w-4" /> Database
              </div>
              <div className="collapse-content mx-2">
                <button
                  className={`${
                    isDatabaseOverviewRoute
                      ? "btn-ghost text-primary"
                      : "btn-ghost"
                  } btn w-full justify-start`}
                  onClick={() => navigate("/documentation/database-overview")}
                >
                  Database Overview
                </button>
              </div>
            </div>
            <div
              className="collapse collapse-arrow join-item border border-base-300"
              onClick={() => setState(1)}
            >
              <input type="radio" name="my-accordion-4" checked={state === 1} />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <Server className="h4 w-4" /> Backend
              </div>
              <div className="collapse-content mx-2">
                <button
                  className={`${
                    isBackendTechnologyRoute
                      ? "btn-ghost text-primary"
                      : "btn-ghost"
                  } btn w-full justify-start`}
                  onClick={() => navigate("/documentation/backend-technology")}
                >
                  Technology
                </button>
                <button
                  className={`${
                    isBackendArchitectureRoute
                      ? "btn-ghost text-primary"
                      : "btn-ghost"
                  } btn w-full justify-start`}
                  onClick={() =>
                    navigate("/documentation/backend-architecture")
                  }
                >
                  Backend Architecture
                </button>
                <button
                  className={`${
                    isBackendApiRoute ? "btn-ghost text-primary" : "btn-ghost"
                  } btn w-full justify-start`}
                  onClick={() => navigate("/documentation/backend-api")}
                >
                  API (Application Programming Interface)
                </button>
                <div className="ml-3">
                  <button
                    className={`${
                      isBackendApiUserRoute
                        ? "btn-ghost text-primary"
                        : "btn-ghost"
                    } btn w-full justify-start`}
                    onClick={() => navigate("/documentation/backend-api/user")}
                  >
                    <User /> User
                  </button>
                  <button
                    className={`${
                      isBackendApiTodoRoute
                        ? "btn-ghost text-primary"
                        : "btn-ghost"
                    } btn w-full justify-start`}
                    onClick={() => navigate("/documentation/backend-api/todo")}
                  >
                    <IconTodoLine className="w-6 h-6" /> Todo
                  </button>
                  <button
                    className={`${
                      isBackendApiOtpRoute
                        ? "btn-ghost text-primary"
                        : "btn-ghost"
                    } btn w-full justify-start`}
                    onClick={() => navigate("/documentation/backend-api/otp")}
                  >
                    <Lock /> Otp
                  </button>
                  <button
                    className={`${
                      isBackendApiFriendsRoute
                        ? "btn-ghost text-primary"
                        : "btn-ghost"
                    } btn w-full justify-start`}
                    onClick={() =>
                      navigate("/documentation/backend-api/friends")
                    }
                  >
                    <Users /> Friends
                  </button>
                  <button
                    className={`${
                      isBackendApiNotificationRoute
                        ? "btn-ghost text-primary"
                        : "btn-ghost"
                    } btn w-full justify-start`}
                    onClick={() =>
                      navigate("/documentation/backend-api/notification")
                    }
                  >
                    <Bell /> Notification
                  </button>
                </div>
                <button
                  className={`${
                    isBackendMiddlewareRoute ? "btn-ghost text-primary" : "btn-ghost"
                  } btn w-full justify-start`}
                  onClick={() => navigate("/documentation/backend-middleware")}
                >
                  Middleware
                </button>
              </div>
            </div>
            <div
              className="collapse collapse-arrow join-item border border-base-300"
              onClick={() => setState(2)}
            >
              <input type="radio" name="my-accordion-4" checked={state === 2} />
              <div className="collapse-title flex items-center gap-2 text-md font-medium">
                <IconReact className="h4 w-4" /> Frontend
              </div>
              <div className="collapse-content mx-2">
              <button
                  className="btn btn-ghost w-full justify-start"
                  onClick={() => navigate("/todo")}
                >
                  Try it now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="bg-base-100 w-[75%] h-screen overflow-y-auto flex flex-col justify-start items-center p-4 gap-2">
          {children}
        </div>
      </div>
    </>
  );
}
