import {
  BarChart4,
  CheckCircle,
  Edit,
  ExternalLink,
  GitCompareArrows,
  Github,
  Loader2,
  LogOut,
  MonitorCheck,
  Palette,
  User,
  UserCogIcon,
  Users,
  Wrench,
} from "lucide-react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useTheme from "../hooks/use-theme";
import { useLocation, useNavigate } from "react-router-dom";
import userApi from "../api/user-api.ts";
import LogoImage from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.ts";
import moment from "moment";
import useOpenModal from "../hooks/use-open-modal.tsx";
import { UpdateAccountModal } from "./modals/update-account-modal.tsx";
import { GifComponent } from "./gif-component.tsx";
import IconFacebook from "./svg/facebook-svg.tsx";
import IconGoogle from "./svg/google-svg.tsx";
import IconEmailOutline from "./svg/email-svg.tsx";
import { updateUserRequest } from "../../types.ts";
import { toast } from "react-toastify";
import { AddFriendModal } from "./modals/add-friend-modal.tsx";
import { createAvatarFallback } from "../lib/string.ts";

interface SidebarComponentProps {
  className: string;
}

export default function SidebarComponent({
  className = "",
}: SidebarComponentProps) {
  const queryClient = useQueryClient();
  const [cookies, removeCookie] = useCookies(["token"]);
  const { theme, isDarkOrLight, detectThemeVariant, isDarkVariant } =
    useTheme();
  const { ModalMethod, ModalType, openModal } = useOpenModal();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute =
    location.pathname === "/" || location.pathname === "/todo";

  const isDashboardRoute = location.pathname === "/dashboard";

  const isAdminSettingsdRoute = location.pathname === "/admin-settings";

  const isFriendsRoute = location.pathname === "/friends";

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });

  const logoutMutation = useMutation({
    mutationFn: () => userApi.logout(cookies.token),
  });

  const updateUserMutation = useMutation({
    mutationFn: (newUser: updateUserRequest) =>
      userApi.updateCurrentUser(cookies.token, newUser),
    onSuccess: (data, variables) => {
      toast.success(`Change Theme to ${variables.theme?.toLowerCase()}`, {
        delay: 1500,
        theme: detectThemeVariant(data.data.user.theme.toLowerCase())
          ? "dark"
          : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GetUserData"] });
    },
  });

  const themeData = [
    "light",
    "dark",
    "synthwave",
    "retro",
    "cyberpunk",
    "garden",
    "forest",
    "aqua",
    "fantasy",
    "black",
    "dracula",
    "night",
    "coffee",
    "dim",
    "sunset",
  ];

  const logout = () => {
    signOut(auth)
      .then(() => {
        logoutMutation.mutate();
        removeCookie("token", undefined);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const iconMap: Record<string, JSX.Element> = {
    GITHUB: <Github className="mr-2 w-4 h-4" />,
    GOOGLE: <IconGoogle className="mr-2 w-4 h-4" />,
    EMAIL: <IconEmailOutline className="mr-2 w-4 h-4" />,
    FACEBOOK: <IconFacebook className="mr-2 w-4 h-4" />,
  };

  return (
    <>
      <input type="checkbox" id="theme_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold py-2">Select Theme !</h3>
          <div className="flex gap-4 flex-wrap">
            {themeData.map((value, index) => (
              <div key={index} data-theme={value} className="bg-transparent">
                <button
                  className="btn outline-base-content rounded-md"
                  onClick={() => {
                    updateUserMutation.mutate({ theme: value.toUpperCase() });
                  }}
                >
                  {updateUserMutation.isPending &&
                    updateUserMutation.variables.theme === value.toUpperCase() ? (
                    <Loader2 className="animate-spin" />
                  ) : null}
                  {theme === value ? <MonitorCheck /> : null}
                  {value}
                  <div className="flex gap-1">
                    <div className="h-5 w-2 bg-primary rounded"></div>
                    <div className="h-5 w-2 bg-secondary rounded"></div>
                    <div className="h-5 w-2 bg-accent rounded"></div>
                    <div className="h-5 w-2 bg-neutral rounded"></div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="theme_modal">
          Close
        </label>
      </div>
      {/* Sidebar */}
      <div
        className={`${isDarkOrLight ? "bg-base-300" : ""
          } px-4 py-6 shadow-lg overflow-y-auto overflow-x-hidden min-h-screen z-50 ${className}`}
      >
        <div className="flex justify-between items-center pb-6">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={LogoImage} className="h-8 w-8" alt="taskease-logo" />
            <h1 className="text-2xl font-bold">TaskEase</h1>
          </div>
          {isPending && <div className="skeleton rounded-full w-12 h-12"></div>}
          {isSuccess && (
            <div className="dropdown dropdown-end cursor-pointer">
              <div
                tabIndex={0}
                role="button"
                className="avatar online placeholder"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  {data.profileId ?
                    <GifComponent id={data.profileId || ""} />
                    : data.imgUrl ? (
                      <img src={data.imgUrl} />
                    ) : (
                      <span className="text-md">{createAvatarFallback(data.username)}</span>
                    )}
                </div>
              </div>
              <div className={`dropdown-content z-[1] menu m-0 p-0 shadow h-96 w-56 ${isDarkOrLight ? "bg-base-content" : "bg-base-300"}`}>
                <div className="h-[25%]">
                  {data.bannerId ? <GifComponent id={data.bannerId || ""} /> : ""}
                </div>
                <div className="bg-base-100 h-[75%]">
                  <div className="h-[15%]">
                    <div className="avatar placeholder">
                      <div className="w-14 -mt-7 ml-4 rounded-full bg-neutral text-neutral-content ring ring-base-100 ring-offset-base-100 ring-offset-2">
                        {data.profileId ?
                          <GifComponent id={data.profileId || ""} />
                          : data.imgUrl ? (
                            <img src={data.imgUrl} />
                          ) : (
                            <span className="text-md">{createAvatarFallback(data.username)}</span>
                          )}
                      </div>
                    </div>
                    <button
                      className="absolute top-1 right-0  text-gray-500 btn btn-ghost btn-xs"
                      onClick={() =>
                        openModal(ModalType.ACCOUNT, ModalMethod.UPDATE)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="h-[85%] overflow-y-auto p-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center bg-base-300 p-2 rounded-md font-bold">
                      <p>{data.username}</p>
                      {data.role === "MEMBER" ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Wrench className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="bg-base-300 p-2 flex flex-col gap-4 rounded-md">
                      <div>
                        <p className="font-semibold mb-1 text-xs">Login with</p>
                        <div className="flex items-center btn-sm btn btn-ghost justify-between">
                          <div className="flex items-center">
                            {iconMap[data.method]}
                            <p className="text-xs font-medium">{data.method}</p>
                            <CheckCircle className="h-4 w-4 ml-1 rounded-full p-[0.11rem]" />
                          </div>
                          <ExternalLink className="h-4 w-4 ml-1 rounded-full p-[0.11rem]" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-xs">Join Since</p>
                        {moment(new Date(data.createdAt)).format("DD/MM/YYYY")}
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-xs">
                          Last Updated
                        </p>
                        {moment(new Date(data.updatedAt)).fromNow()}
                      </div>
                    </div>
                    <button
                      className="btn btn-error btn-sm mt-2"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" pt-4 flex flex-col gap-4">
          <div>
            <h3 className="font-bold opacity-80">Type</h3>
            <div className="flex flex-col gap-6 p-4">
              <div
                className={`flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all ${isHomeRoute && "bg-primary/20"
                  }`}
                onClick={() => navigate("/todo")}
              >
                <CheckCircle className="text-primary" />
                <h6 className="font-semibold text-sm">Todo</h6>
              </div>
              <div
                className={`flex gap-4 cursor-pointer p-2 items-center rounded hover:bg-primary/20 transition-all ${false && "bg-primary/20"
                  }`}
                onClick={() =>
                  toast.info("This feature is on development", {
                    theme: isDarkVariant ? "dark" : "light",
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })
                }
              >
                <GitCompareArrows className="text-primary" />
                <h6 className="font-semibold text-sm">Project Tracker</h6>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold opacity-80">Connection</h3>
            <div className="flex flex-col gap-6 p-4">
              <div
                className={`flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all ${isFriendsRoute && "bg-primary/20"
                  }`}
                onClick={() => navigate("/friends")}
              >
                <Users className="text-primary" />
                <h6 className="font-semibold text-sm">Friends</h6>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold opacity-80">Personalized</h3>
            <div className="flex flex-col gap-6 p-4">
              {data?.role === "ADMIN" && (
                <div
                  className={`flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all ${isAdminSettingsdRoute && "bg-primary/20"
                    }`}
                  onClick={() => navigate("/admin-settings")}
                >
                  <Wrench className="text-primary" />
                  <h6 className="font-semibold text-sm">Admin Settings</h6>
                </div>
              )}
              <div
                className="flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all"
                onClick={() => openModal(ModalType.ACCOUNT, ModalMethod.UPDATE)}
              >
                <UserCogIcon className="text-primary" />
                <h6 className="font-semibold text-sm">Account Settings</h6>
              </div>
              <div
                className={`flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all ${isDashboardRoute && "bg-primary/20"
                  }`}
                onClick={() => navigate("/dashboard")}
              >
                <BarChart4 className="text-primary" />
                <h6 className="font-semibold text-sm">Dasboard</h6>
              </div>
              <div className="flex gap-4 cursor-pointer p-2 items-center hover:bg-primary/20 rounded transition-all">
                <label
                  htmlFor="theme_modal"
                  className="flex items-center gap-4"
                >
                  <Palette className="text-primary" />
                  <h6 className="font-semibold text-sm">Theme</h6>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSuccess && (
        <UpdateAccountModal
          defaultValueBannerId={data.bannerId || ""}
          defaultValueProfileId={data.profileId || ""}
          defaultValueUsername={data.username || ""}
        />
      )}
      <AddFriendModal />
    </>
  );
}
