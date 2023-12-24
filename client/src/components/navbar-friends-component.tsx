import { Inbox } from "lucide-react";
import useOpenModal from "../hooks/use-open-modal";
import IconUsersLine from "./svg/user-line-svg";
import { FilteredFriends, NotificationsResponse } from "../../types";
import { RightSidebarFriendsComponent } from "./right-sidebar-friends-component";
import { UseQueryResult } from "@tanstack/react-query";

enum TabState {
  ONLINE,
  ALL,
  PENDING,
}

interface NavbarFriendsComponentProps {
  tabState: TabState;
  setTabState: (value: React.SetStateAction<TabState>) => void;
  myPendingFriends: FilteredFriends;
  myPendingRequset: FilteredFriends;
  notifications: UseQueryResult<NotificationsResponse, Error>;
}

export const NavbarFriendsComponent = ({
  tabState,
  setTabState,
  myPendingFriends,
  myPendingRequset,
  notifications
}: NavbarFriendsComponentProps) => {
  const { ModalMethod, ModalType, openModal } = useOpenModal();
  return (
    <div className="flex justify-between items-center px-4 py-3 shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <IconUsersLine className="h-6 w-6" />
          <p className="font-semibold text-sm">Friends</p>
        </div>
        <div className="w-[1px] h-5 bg-white/10"></div>
        <div className="flex gap-4">
          <button
            className={`btn btn-ghost btn-xs ${
              tabState === TabState.ONLINE && "bg-white/10"
            }`}
            onClick={() => setTabState(TabState.ONLINE)}
          >
            Online
          </button>
          <button
            className={`btn btn-ghost btn-xs ${
              tabState === TabState.ALL && "bg-white/10"
            }`}
            onClick={() => setTabState(TabState.ALL)}
          >
            All
          </button>
          {myPendingFriends?.length === 0 ? (
            <button
              className={`btn btn-ghost btn-xs ${
                tabState === TabState.PENDING && "bg-white/10"
              }`}
              onClick={() => setTabState(TabState.PENDING)}
            >
              Pending
            </button>
          ) : (
            <div className="relative">
              <span className="absolute flex -top-[2px] -right-[2px] h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <button
                className={`btn btn-ghost btn-xs ${
                  tabState === TabState.PENDING && "bg-white/10"
                }`}
                onClick={() => setTabState(TabState.PENDING)}
              >
                Pending
              </button>
            </div>
          )}

          <button
            className="btn btn-primary btn-xs"
            onClick={() => openModal(ModalType.FRIEND, ModalMethod.CREATE)}
          >
            Add Friend
          </button>
        </div>
      </div>
      <div className="drawer z-50 w-fit drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content w-fit">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button w-fit block md:hidden btn btn-ghost btn-xs"
          >
            <Inbox className="h-4 w-4" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-0 w-80 min-h-full bg-base-200">
            <RightSidebarFriendsComponent
                myPendingRequest={myPendingRequset}
                notifications={notifications}
                isMobile
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
