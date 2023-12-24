import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedAlreadyLoginRouteProps {
  isSignedIn?: boolean;
  children: React.ReactElement;
}

function ProtectedAlreadyLoginRoute({ isSignedIn, children }: ProtectedAlreadyLoginRouteProps) {
  const [cookies] = useCookies(["token"]);

  isSignedIn = cookies.token === "undefined" || cookies.token === undefined ? false : true;

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedAlreadyLoginRoute;
