import { ToastContainer } from "react-toastify";
import ContentLayout from "./content-layout";
import HomeLayout from "./home-layout";

interface ContentCenterLayoutProps {
    children: React.ReactElement,
    divClassname?: string;
}

export default function ContentCenterLayout({ children, divClassname }: ContentCenterLayoutProps) {
    return(
        <HomeLayout>
        <ContentLayout>
          <div className={`h-full w-full flex items-center justify-center ${divClassname}`}>
            {children}
          </div>
        </ContentLayout>
        <ToastContainer />
      </HomeLayout>
    )
}