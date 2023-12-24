import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import userApi from "../api/user-api";
import useTheme from "../hooks/use-theme";

interface ProtectedRouteProps {
  isSignedIn?: boolean;
  children: React.ReactElement;
}

function ProtectedRoute({ isSignedIn, children }: ProtectedRouteProps) {
  const [cookies] = useCookies(["token"]);
  const { changeTheme } = useTheme();

  const user = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });

  useEffect(() => {
    if (user.isSuccess) {
      changeTheme(user?.data?.theme.toLowerCase() as string);
    }
  }, [
    changeTheme,
    user.isSuccess,
    user.data,
  ]);

  isSignedIn =
    cookies.token === "undefined" || cookies.token === undefined ? false : true;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default ProtectedRoute;
