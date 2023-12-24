import { ToastContainer, toast } from "react-toastify";
import HomeLayout from "../layouts/home-layout";
import ContentLayout from "../layouts/content-layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import friendsApi from "../api/friends-api";
import { useCookies } from "react-cookie";
import userApi from "../api/user-api";
import useTheme from "../hooks/use-theme";
import { NavbarMobileComponent } from "../components/navbar-mobile-component";
import Lottie from "lottie-react";
import loadingData from "../assets/animation/loading-loncat.json";
import ContentCenterLayout from "../layouts/content-center-layout";
import { useTips } from "../hooks/use-tips";
import { useEffect, useState } from "react";
import { useDocumentTitle } from "usehooks-ts";
import notificationApi from "../api/notification-api";
import { NavbarFriendsComponent } from "../components/navbar-friends-component";
import { ContentFriendsComponent } from "../components/content-friends-component";
import { RightSidebarFriendsComponent } from "../components/right-sidebar-friends-component";
import { ErrorComponent } from "../components/error-component";

enum TabState {
  ONLINE,
  ALL,
  PENDING,
}

export default function FriendsPage() {
  useDocumentTitle("TaskEase - Friends");

  const [cookies] = useCookies(["token"]);
  const { isDarkVariant } = useTheme();
  const { getRandom, tip } = useTips();
  const queryClient = useQueryClient();
  const [tabState, setTabState] = useState<TabState>(TabState.ALL);

  const user = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });

  const friends = useQuery({
    queryKey: ["GetFriends"],
    queryFn: () => friendsApi.getFriends(cookies.token),
  });

  const notifications = useQuery({
    queryKey: ["GetNotifications"],
    queryFn: () => notificationApi.getNotifications(cookies.token),
  });

  const acceptFriendMutation = useMutation({
    mutationFn: (friendsId: string) =>
      friendsApi.acceptFriend(cookies.token, friendsId),
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

  const rejectFriendMutation = useMutation({
    mutationFn: (friendsId: string) =>
      friendsApi.rejectFriend(cookies.token, friendsId),
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

  const deleteFriendMutation = useMutation({
    mutationFn: (friendsId: string) =>
      friendsApi.deleteFriend(cookies.token, friendsId),
    onSuccess: (data) => {
      console.log(data);
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
  useEffect(() => {
    getRandom();
  }, [getRandom]);

  if (user.isPending || friends.isPending || notifications.isPending) {
    return (
      <ContentCenterLayout divClassname="flex-col gap-2">
        <>
          <Lottie
            animationData={loadingData}
            className="h-24 w-24 fill-white white"
            loop={true}
          />
          <p className="font-bold  text-sm animate-pulse">{tip}</p>
        </>
      </ContentCenterLayout>
    );
  }

  const myPendingFriends = friends?.data?.data
    ?.filter(
      (value) =>
        value?.initiator?.id !== user?.data?.id && value?.isAccept === false
    )
    .map((item) => {
      const relationId = item.id;
      const opponent =
        item.initiator.id === user.data.id ? item.respondent : item.initiator;
      const {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        method,
        createdAt,
        updatedAt,
      } = opponent;
      return {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        method,
        relationId,
        createdAt,
        updatedAt,
      };
    });

  const myPendingRequest = friends?.data?.data
    ?.filter(
      (value) =>
        value?.initiator?.id === user?.data?.id && value?.isAccept === false
    )
    .map((item) => {
      const relationId = item.id;
      const opponent =
        item.initiator.id === user.data.id ? item.respondent : item.initiator;
      const {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        method,
        createdAt,
        updatedAt,
      } = opponent;
      return {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        method,
        relationId,
        createdAt,
        updatedAt,
      };
    });

  const myFriends = friends?.data?.data
    ?.filter((value) => value.isAccept === true)
    .map((item) => {
      const relationId = item.id;
      const opponent =
        item.initiator.id === user.data.id ? item.respondent : item.initiator;
      const {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        method,
        createdAt,
        updatedAt,
      } = opponent;
      return {
        id,
        username,
        email,
        password,
        imgUrl,
        bannerId,
        profileId,
        role,
        isOnline,
        todoBackground,
        theme,
        relationId,
        method,
        createdAt,
        updatedAt,
      };
    });

  const myOnlineFriends = myFriends?.filter((value) => value.isOnline === true);

  return (
    <HomeLayout>
      <ContentLayout>
        <NavbarMobileComponent />
        <NavbarFriendsComponent
          myPendingFriends={myPendingFriends}
          myPendingRequset={myPendingRequest}
          notifications={notifications}
          setTabState={setTabState}
          tabState={tabState}
        />
        <div className="flex h-full overflow-y-hidden items-start">
          <ContentFriendsComponent
            myFriends={myFriends}
            myOnlineFriends={myOnlineFriends}
            myPendingFriends={myPendingFriends}
            rejectFriendMutation={rejectFriendMutation}
            tabState={tabState}
            acceptFriendMutation={acceptFriendMutation}
            deleteFriendMutation={deleteFriendMutation}
          />
          {/* right sidebar */}
          <RightSidebarFriendsComponent
            myPendingRequest={myPendingRequest}
            notifications={notifications}
          />
        </div>
      </ContentLayout>
      <ToastContainer />
    </HomeLayout>
  );
}
