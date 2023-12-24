import ContentLayout from "../layouts/content-layout";
import HomeLayout from "../layouts/home-layout";
import { useQuery } from "@tanstack/react-query";
import userApi from "../api/user-api";
import { useCookies } from "react-cookie";
import { TotalTodoActivityComponent } from "../components/total-todo-activity-component";
import { TotalTodoActivityDiagramComponent } from "../components/total-todo-activity-diagram-component";
import { TotalActivityDiagramComponent } from "../components/total-activity-diagram-component";
import { TotalActivityPieDiagramComponent } from "../components/total-activity-pie-diagram-component";
import { useState } from "react";
import { ActivityTableComponent } from "../components/activity-table-component";
import { GetUserResponse } from "../../types";
import { NavbarMobileComponent } from "../components/navbar-mobile-component";
import { useDocumentTitle } from "usehooks-ts";
import { ToastContainer } from "react-toastify";

export default function DashboardPage() {
  useDocumentTitle('TaskEase - Dashboard')
  const [cookies] = useCookies(["token"]);
  const [showRead, setShowRead] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["getUsersDashboard"],
    queryFn: () =>
      userApi.getUserData(
        cookies.token,
        "?includeTodo=true&includeActivity=true"
      ),
  });

  return (
    <HomeLayout>
      <ContentLayout>
        <NavbarMobileComponent />
        <div id="dashboard" className="bg-base-200 p-4 h-screen flex flex-col lg:flex lg:flex-wrap lg:flex-row gap-4 lg:items-center overflow-x-hidden overflow-y-auto">
          <TotalTodoActivityComponent
            data={data as GetUserResponse}
            isLoading={isPending}
          />
          <TotalTodoActivityDiagramComponent
            data={data as GetUserResponse}
            isLoading={isPending}
          />
          <TotalActivityDiagramComponent
            data={data as GetUserResponse}
            showRead={showRead}
            setShowRead={setShowRead}
            isLoading={isPending}
          />
          <TotalActivityPieDiagramComponent
            data={data as GetUserResponse}
            showRead={showRead}
            setShowRead={setShowRead}
            isLoading={isPending}
          />
          <ActivityTableComponent
            data={data as GetUserResponse}
            showRead={showRead}
            isLoading={isPending}
          />
        </div>
      </ContentLayout>  
      <ToastContainer />
    </HomeLayout>
  );
}
