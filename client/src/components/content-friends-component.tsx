import { Filter } from "lucide-react";
import { FriendListComponent } from "./friend-list-component";
import { FilteredFriends } from "../../types";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

enum TabState {
  ONLINE,
  ALL,
  PENDING,
}

interface ContentFriendsComponentProps {
  tabState: TabState;
  myFriends: FilteredFriends;
  myOnlineFriends: FilteredFriends;
  myPendingFriends: FilteredFriends;
  /* eslint-disable */
  deleteFriendMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  acceptFriendMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  rejectFriendMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  /* eslint-disable */
}

export const ContentFriendsComponent = ({
  tabState,
  myFriends,
  myOnlineFriends,
  myPendingFriends,
  deleteFriendMutation,
  acceptFriendMutation,
  rejectFriendMutation,
}: ContentFriendsComponentProps) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="w-full overflow-y-auto md:w-[70%] px-6 py-4 h-full">
      <div className="text-primary bg-base-300 w-full justify-between flex gap-2 p-2 rounded-md">
        <input
          type="text"
          placeholder="Filter by name..."
          className="outline-none bg-transparent input-ghost w-full max-w-xs"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Filter className="opacity-50" />
      </div>
      {tabState === TabState.ALL && (
        <div>
          <p className="uppercase text-sm font-bold py-6">
            ALL FRIENDS - {myFriends?.length}
          </p>
          <div className="flex flex-col gap-2">
            {input.trim() === ""
              ? myFriends?.map((value) => (
                  <FriendListComponent
                    relationId={value.relationId}
                    key={value.id}
                    email={value.email}
                    imgUrl={value.imgUrl}
                    isOnline={value.isOnline}
                    username={value.username}
                    deleteFriendMutation={deleteFriendMutation}
                  />
                ))
              : myFriends
                  ?.filter((value) => {
                    const lowercaseUsername = value.username
                      ? value.username.toLowerCase()
                      : "";
                    const lowercaseInput = input
                      ? String(input).toLowerCase()
                      : "";
                    return lowercaseUsername.includes(lowercaseInput);
                  })
                  ?.map((value) => (
                    <FriendListComponent
                      relationId={value.relationId}
                      key={value.id}
                      email={value.email}
                      imgUrl={value.imgUrl}
                      isOnline={value.isOnline}
                      username={value.username}
                      deleteFriendMutation={deleteFriendMutation}
                    />
                  ))}
          </div>
        </div>
      )}
      {tabState === TabState.ONLINE && (
        <div>
          <p className="uppercase text-sm font-bold py-6">
            ONLINE - {myOnlineFriends?.length}
          </p>
          <div className="flex flex-col gap-2">
            {input.trim() === ""
              ? myOnlineFriends?.map((value) => (
                  <FriendListComponent
                    relationId={value.relationId}
                    key={value.id}
                    email={value.email}
                    imgUrl={value.imgUrl}
                    isOnline={value.isOnline}
                    username={value.username}
                    deleteFriendMutation={deleteFriendMutation}
                  />
                ))
              : myOnlineFriends
                  ?.filter((value) => {
                    const lowercaseUsername = value.username
                      ? value.username.toLowerCase()
                      : "";
                    const lowercaseInput = input
                      ? String(input).toLowerCase()
                      : "";
                    return lowercaseUsername.includes(lowercaseInput);
                  })
                  ?.map((value) => (
                    <FriendListComponent
                      relationId={value.relationId}
                      key={value.id}
                      email={value.email}
                      imgUrl={value.imgUrl}
                      isOnline={value.isOnline}
                      username={value.username}
                      deleteFriendMutation={deleteFriendMutation}
                    />
                  ))}
          </div>
        </div>
      )}
      {tabState === TabState.PENDING && (
        <div>
          <p className="uppercase text-sm font-bold py-6">
            PENDING - {myPendingFriends?.length}
          </p>
          <div className="flex flex-col gap-2">
            {input.trim() === ""
              ? myPendingFriends?.map((value) => (
                  <FriendListComponent
                    relationId={value.relationId}
                    key={value.id}
                    email={value.email}
                    imgUrl={value.imgUrl}
                    isOnline={value.isOnline}
                    username={value.username}
                    isPendingState
                    acceptFriendMutation={acceptFriendMutation}
                    rejectFriendMutation={rejectFriendMutation}
                  />
                ))
              : myPendingFriends
                  ?.filter((value) => {
                    const lowercaseUsername = value.username
                      ? value.username.toLowerCase()
                      : "";
                    const lowercaseInput = input
                      ? String(input).toLowerCase()
                      : "";
                    return lowercaseUsername.includes(lowercaseInput);
                  })
                  ?.map((value) => (
                    <FriendListComponent
                      relationId={value.relationId}
                      key={value.id}
                      email={value.email}
                      imgUrl={value.imgUrl}
                      isOnline={value.isOnline}
                      username={value.username}
                      isPendingState
                      acceptFriendMutation={acceptFriendMutation}
                      rejectFriendMutation={rejectFriendMutation}
                    />
                  ))}
          </div>
        </div>
      )}
    </div>
  );
};
