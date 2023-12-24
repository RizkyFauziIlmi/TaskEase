import { HeartHandshake, UserPlus } from "lucide-react";
import ContentLayout from "../layouts/content-layout";
import HomeLayout from "../layouts/home-layout";
import { NavbarMobileComponent } from "./navbar-mobile-component";
import useOpenModal from "../hooks/use-open-modal";
import { ToastContainer } from "react-toastify";

export const NoFriendComponent = () => {
  const { ModalMethod, ModalType, openModal } = useOpenModal();

  return (
    <HomeLayout>
      <ContentLayout>
        <NavbarMobileComponent />
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <HeartHandshake className="w-24 h-24" />
          <p className="font-semibold opacity-80 mt-4 text-sm">
            If you don't have any buddies, make some now!
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => openModal(ModalType.FRIEND, ModalMethod.CREATE)}
          >
            <UserPlus className="h-4 w-4" /> Add Friend
          </button>
        </div>
      </ContentLayout>
      <ToastContainer />
    </HomeLayout>
  );
};
