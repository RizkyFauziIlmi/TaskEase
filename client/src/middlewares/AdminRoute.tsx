import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import userApi from "../api/user-api";
import { useEffect } from "react";
import useTheme from "../hooks/use-theme";

interface AdminRouteProps {
  isSignedIn?: boolean;
  children: React.ReactElement;
}

function AdminRoute({ isSignedIn, children }: AdminRouteProps) {
  const [cookies] = useCookies(["token"]);
  const { changeTheme } = useTheme();

  const { data, isSuccess } = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });


  useEffect(() => {
    if (isSuccess) {
      changeTheme(data.theme.toLowerCase());
    }
  }, [changeTheme, isSuccess, data]);

  isSignedIn =
    cookies.token === "undefined" || cookies.token === undefined ? false : true;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isSuccess) {
    if (data?.role !== "ADMIN") {
      return <Navigate to="/todo" replace />;
    }
  }

  return children;
}
export default AdminRoute;
