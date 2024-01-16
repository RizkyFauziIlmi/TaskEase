import moment from "moment";
import { GetUserResponse } from "../../types";
import IconEmail from "./svg/email-fill-svg";
import IconFacebook from "./svg/facebook-svg";
import IconGithub from "./svg/github-svg";
import IconGoogle from "./svg/google-svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../api/user-api";
import { useCookies } from "react-cookie";
import { Activity, Loader2, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import IconTodoLine from "./svg/todo-line-svg";
import { toast } from "react-toastify";
import useTheme from "../hooks/use-theme";

interface AdminTableComponentProps {
  data: GetUserResponse[];
  isLoading: boolean;
  isSuccess: boolean;
}

export const AdminTableComponent = ({
  data,
  isLoading,
  isSuccess,
}: AdminTableComponentProps) => {
  const [cookies] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const { isDarkVariant } = useTheme();

  const toggleRoleMutation = useMutation({
    mutationFn: (userId: string) => userApi.toggleRole(cookies.token, userId),
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) =>
      userApi.deleteSpecificUser(cookies.token, userId),
    onSuccess: (data) => {
      toast.success(`${data.data.message}`, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
  });

  const IconMap: Record<string, JSX.Element> = {
    GITHUB: <IconGithub />,
    GOOGLE: <IconGoogle />,
    EMAIL: <IconEmail />,
    FACEBOOK: <IconFacebook />,
  };

  if (isLoading) {
    return <div className="skeleton min-h-[70%] max-h-[70%] w-full"></div>;
  }

  const table = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  if (isSuccess) {
    return (
      <motion.div
        variants={table}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="overflow-auto min-h-[70%] max-h-[70%] w-full bg-base-100 rounded-md"
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Join Since</th>
              <th>Last Update</th>
              <th>Last Login</th>
              <th>Details</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((value) => {
                const isOptimisticUpdateToggleRole =
                  toggleRoleMutation.isPending &&
                  toggleRoleMutation.variables === value.id;

                const isOptimisticUpdateDeleteUser =
                  deleteUserMutation.isPending &&
                  deleteUserMutation.variables === value.id;

                const lastLogin =
                  moment(
                    value.activities
                      ?.filter(
                        (value) =>
                          value.description === "Login" ||
                          value.description === "Create a new Account"
                      )
                      ?.sort((a, b) => moment(b.time).diff(moment(a.time)))[0]
                      .time
                  ).calendar();

                return (
                  <motion.tr
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                    key={value.id}
                    className={
                      isOptimisticUpdateDeleteUser ||
                      isOptimisticUpdateToggleRole
                        ? "opacity-50 pointer-events-none cursor-not-allowed"
                        : ""
                    }
                  >
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={value.imgUrl} alt={value.username} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold flex item">
                            {value.username}
                            {isOptimisticUpdateToggleRole ? (
                              <p>
                                {value.role !== "ADMIN" && (
                                  <Wrench className="text-primary h-4 w-4 ml-2 opacity-20" />
                                )}
                              </p>
                            ) : (
                              <p>
                                {value.role === "ADMIN" && (
                                  <Wrench className="text-primary h-4 w-4 ml-2" />
                                )}
                              </p>
                            )}
                          </div>
                          <div className="text-sm opacity-50">
                            {value.email || null}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs">
                        {moment(new Date(value.createdAt)).format("DD/MM/YYYY")}
                      </p>
                    </td>
                    <td>
                      <p className="text-xs">
                        {moment(new Date(value.updatedAt)).calendar()}
                      </p>
                    </td>
                    <td className="text-xs">{lastLogin || ""}</td>
                    <td>
                      <div className="text-xs flex flex-col gap-1 font-semibold opacity-80">
                        <p className="flex items-center gap-2">
                          {value._count?.todos || 0}{" "}
                          <IconTodoLine className="w-4 h-4" />
                        </p>
                        <p className="flex items-center gap-2">
                          {value._count?.activities || 0}{" "}
                          <Activity className="w-4 h-4" />
                        </p>
                      </div>
                    </td>
                    <td>
                      <p className="flex gap-2 items-center text-xs">
                        {IconMap[value.method]}
                        {value.method}
                      </p>
                    </td>
                    <td className="flex gap-2 flex-col">
                      {isOptimisticUpdateDeleteUser ? (
                        <button
                          className="btn flex gap-1 items-center btn-error w-full btn-xs mr-2"
                          disabled
                        >
                          <Loader2 className="h-2 w-2 animate-spin" />
                          <p className="text-xs">Deleting...</p>
                        </button>
                      ) : (
                        <button
                          className="btn btn-error btn-xs mr-2 w-full"
                          disabled={deleteUserMutation.isPending}
                          onClick={() => deleteUserMutation.mutate(value.id)}
                        >
                          Delete
                        </button>
                      )}

                      {isOptimisticUpdateToggleRole ? (
                        <button
                          className="btn btn-warning w-full btn-xs"
                          disabled
                        >
                          {value.role === "ADMIN"
                            ? "Make it Admin"
                            : "Remove Admin"}
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning w-full btn-xs"
                          disabled={toggleRoleMutation.isPending}
                          onClick={() => toggleRoleMutation.mutate(value.id)}
                        >
                          {value.role === "ADMIN"
                            ? "Remove Admin"
                            : "Make it Admin"}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Join Since</th>
              <th>Last Update</th>
              <th>Last Login</th>
              <th>Details</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </motion.div>
    );
  }
};
