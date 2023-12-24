import HomeLayout from "../layouts/home-layout";
import TodoHeaderComponent from "../components/todo-header-component";
import TodoContentComponent from "../components/todo-content-component";
import ContentLayout from "../layouts/content-layout";
import { useDocumentTitle } from "usehooks-ts";
import { ToastContainer } from "react-toastify";

export default function TodoPage() {
  useDocumentTitle('TaskEase - Todo');

  return (
    <HomeLayout>
      <ContentLayout>
        <TodoHeaderComponent />
        <TodoContentComponent />
      </ContentLayout>
      <ToastContainer />
    </HomeLayout>
  );
}
