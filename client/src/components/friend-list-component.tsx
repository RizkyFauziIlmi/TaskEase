import { Check, Loader2, UserMinusIcon, X } from "lucide-react";
import { censorEmail, generateAbbreviation } from "../lib/string";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface FriendListComponentProps {
  relationId: string;
  key: string;
  isOnline: boolean;
  imgUrl: string | undefined;
  username: string;
  email: string | undefined;
  isPendingState?: boolean;
  /* eslint-disable */
  acceptFriendMutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  deleteFriendMutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  rejectFriendMutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  /* eslint-disable */
}

export const FriendListComponent = ({
  relationId,
  key,
  email,
  imgUrl,
  isOnline,
  username,
  isPendingState = false,
  acceptFriendMutation,
  deleteFriendMutation,
  rejectFriendMutation,
}: FriendListComponentProps) => {
  const disabledButton =
    acceptFriendMutation?.isPending ||
    deleteFriendMutation?.isPending ||
    rejectFriendMutation?.isPending;

  return (
    <div
      key={key}
      className="flex items-center justify-between border-y px-2 py-4 hover:bg-base-100 transition-all hover:rounded-md border-base-100"
    >
      <div className="flex items-center gap-2">
        <div
          className={`avatar placeholder ${isOnline ? "online" : "offline"}`}
        >
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            {imgUrl ? (
              <img src={imgUrl} />
            ) : (
              <span className="text-xs">{generateAbbreviation(username)}</span>
            )}
          </div>
        </div>
        <div className="text-sm">
          <p className="font-bold">
            {username}
            {email ? " | " + censorEmail(email) : ""}
          </p>
          <p className="font-semibold opacity-50">
            {isOnline ? "online" : "offline"}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {isPendingState ? (
          <>
            <button
              className="btn btn-ghost btn-sm bg-base-300/50 hover:bg-base-300 p-2 rounded-full"
              disabled={disabledButton}
              onClick={() => acceptFriendMutation?.mutate(relationId)}
            >
              {acceptFriendMutation?.isPending &&
              acceptFriendMutation.variables === relationId ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
            <button
              className="btn btn-ghost btn-sm bg-base-300/50 hover:bg-base-300 p-2 rounded-full"
              disabled={disabledButton}
              onClick={() => rejectFriendMutation?.mutate(relationId)}
            >
              {rejectFriendMutation?.isPending &&
              rejectFriendMutation.variables === relationId ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4 text-primary" />
              )}
            </button>
          </>
        ) : (
          <button
            className="btn btn-error btn-sm p-2 rounded-md"
            disabled={disabledButton}
            onClick={() => deleteFriendMutation?.mutate(relationId)}
          >
            {deleteFriendMutation?.isPending &&
            deleteFriendMutation.variables === relationId ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserMinusIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
