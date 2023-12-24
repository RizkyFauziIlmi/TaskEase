import { useQuery } from "@tanstack/react-query";
import ContentLayout from "../layouts/content-layout";
import HomeLayout from "../layouts/home-layout";
import userApi from "../api/user-api";
import { useCookies } from "react-cookie";
import { AdminTableComponent } from "../components/admin-table-component";
import { AdminHeaderComponent } from "../components/admin-header-component";
import { GetUserResponse } from "../../types";
import { useDocumentTitle } from "usehooks-ts";
import { ToastContainer } from "react-toastify";
import { NavbarMobileComponent } from "../components/navbar-mobile-component";
import ContentCenterLayout from "../layouts/content-center-layout";
import { ErrorComponent } from "../components/error-component";

export default function AdminSettingsPage() {
  useDocumentTitle("TaskEase - Admin Settings");
  
  const [cookies] = useCookies(["token"]);

  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["getUsersAdminSettings"],
    queryFn: () => userApi.getAllUser(cookies.token),
  });

  if (data?.length === 0) {
    return(
      <ContentCenterLayout>
        <ErrorComponent
        message="You're the only one user"
          callback={() => refetch()}
        />
      </ContentCenterLayout>
    )
  }

  return (
    <HomeLayout>
      <ContentLayout>
        <NavbarMobileComponent />
        <div className="p-8 h-screen overflow-y-auto overflow-x-hidden">
          <AdminHeaderComponent
            data={data as GetUserResponse[]}
            isLoading={isPending}
            isSuccess={isSuccess}
          />
          <AdminTableComponent
            data={data as GetUserResponse[]}
            isLoading={isPending}
            isSuccess={isSuccess}
          />
        </div>
      </ContentLayout>
      <ToastContainer />
    </HomeLayout>
  );
}
