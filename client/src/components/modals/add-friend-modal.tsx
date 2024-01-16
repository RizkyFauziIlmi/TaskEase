import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, SearchX, UserPlus } from "lucide-react";
import friendsApi from "../../api/friends-api";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { censorEmail, createAvatarFallback } from "../../lib/string";
import { useDebounce } from "usehooks-ts";
import AddFriendSkeleton from "../skeletons/add-friend-skeleton";
import { toast } from "react-toastify";
import useTheme from "../../hooks/use-theme";
import { GifComponent } from "../gif-component";

export const AddFriendModal = () => {
  const [cookies] = useCookies(["token"]);
  const [input, setInput] = useState<string>("");
  const { isDarkVariant } = useTheme();
  const queryClient = useQueryClient();

  const debounceInput = useDebounce<string>(input, 1500);

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["getAddFriends", debounceInput],
    queryFn: () => friendsApi.search(cookies.token, input),
    retry: false,
  });

  const addFriendMutation = useMutation({
    mutationFn: (friendUserId: string) =>
      friendsApi.addFriend(cookies.token, friendUserId),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      queryClient.invalidateQueries({
        queryKey: ["GetFriends"],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const renderSkeletonElements = () =>
    Array(4)
      .fill(null)
      .map((_, index) => <AddFriendSkeleton key={index} />);

  return (
    <dialog id="add_friend_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-xl text-center">Add Friends</h3>
        <div>
          <div className="relative w-full mt-4">
            <div className="absolute inset-y-0 -start-2 flex items-center ps-3 pointer-events-none">
              <Search className="opacity-50 w-6 h-6 cursor-pointer" />
            </div>
            <input
              type="text"
              id="search"
              className="bg-base-200 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-300 transition group"
              placeholder="Search by username or email... "
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col h-48 overflow-y-auto gap-8 mt-4">
            {isPending && renderSkeletonElements()}
            {isSuccess &&
              data?.data?.map((value) => (
                <div
                  key={value.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`${value.isOnline ? "online" : "offline"} avatar placeholder`}
                    >
                      <div className="bg-neutral text-neutral-content rounded-full w-12">
                        {value.profileId ?
                          <GifComponent id={value.profileId || ""} />
                          : value.imgUrl ? (
                            <img src={value.imgUrl} />
                          ) : (
                            <span className="text-md">{createAvatarFallback(value.username)}</span>
                          )}
                      </div>
                    </div>
               
                    <div>
                      <p className="font-bold">{value.username}</p>
                      <p>{censorEmail(value.email || "")}</p>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() => addFriendMutation.mutate(value.id)}
                    disabled={addFriendMutation.isPending}
                  >
                    {addFriendMutation.isPending &&
                      addFriendMutation.variables === value.id && (
                        <Loader2 className="animate-spin w-4 h-4" />
                      )}
                    <UserPlus className="h-4 w-4" /> Add Friend
                  </button>
                </div>
              ))}
            {error && (
              <div className="h-full w-full flex items-center justify-center animate-pulse">
                <SearchX />
                <p className="text-lg font-bold ml-2">User not found</p>
              </div>
            )}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" onClick={() => setInput("")}>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
