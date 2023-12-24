import { UseQueryResult } from "@tanstack/react-query";
import { FilteredFriends, NotificationsResponse } from "../../types";
import { generateAbbreviation } from "../lib/string";
import moment from "moment";

interface RightSidebarFriendsComponentProps {
  myPendingRequest: FilteredFriends;
  notifications: UseQueryResult<NotificationsResponse, Error>;
  isMobile?: boolean;
}

export const RightSidebarFriendsComponent = ({
  myPendingRequest,
  notifications,
  isMobile = false,
}: RightSidebarFriendsComponentProps) => {
  return (
    <div
      className={`${
        isMobile ? "block" : "hidden"
      } overflow-y-auto md:block md:w-[30%] px-4 py-7 border-l-[1px] border-base-100 h-full`}
    >
      <h2 className="text-xl font-bold mb-4">Notification</h2>
      <div className="flex flex-col gap-4">
        {myPendingRequest?.length !== 0 && (
          <div className="w-full flex items-center h-fit gap-2 p-2 bg-base-300 rounded-md">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              {myPendingRequest
                ?.sort((a, b) => {
                  if (a.imgUrl === undefined && b.imgUrl !== undefined) {
                    return 1; // a dianggap lebih besar, tempat di akhir
                  } else if (a.imgUrl !== undefined && b.imgUrl === undefined) {
                    return -1; // b dianggap lebih besar, tempat di awal
                  } else {
                    return 0; // urutan tetap, tidak ada perubahan
                  }
                })
                .slice(0, 2)
                .map((value) => (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      {value.imgUrl ? (
                        <img src={value.imgUrl} />
                      ) : (
                        <span className="text-xs">
                          {generateAbbreviation(value.username)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              {myPendingRequest?.length > 3 || [].length > 3 ? (
                <div className="avatar placeholder">
                  <div className="w-10 bg-neutral text-neutral-content text-xs">
                    <span>
                      {myPendingRequest?.length ||
                        [].length -
                          (myPendingRequest
                            ? myPendingRequest.slice(0, 3).length
                            : 0)}
                      +
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <p className="text-xs font-bold">Pending Request</p>
          </div>
        )}
        {notifications.data?.data?.map((value) => (
          <div className="w-full flex items-center h-fit gap-2 p-2 bg-base-300 rounded-md">
            <div
              className={`avatar placeholder ${
                value.Sender.isOnline ? "online" : "offline"
              }`}
            >
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                {value.Sender.imgUrl ? (
                  <img src={value.Sender.imgUrl} />
                ) : (
                  <span className="text-xs">
                    {generateAbbreviation(value.Sender.username)}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs">
              <p>{value.description}</p>
              <p>{moment(value.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
