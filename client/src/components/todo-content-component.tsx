import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import todoApi from "../api/todo-api";
import UpdateTodoModal from "./modals/update-todo-modal";
import { useState } from "react";
import { ListTodoComponent } from "./list-todo-component";
import {
  Check,
  Grid,
  List,
  Loader2,
  Palette,
} from "lucide-react";
import { GridTodoComponent } from "./grid-todo-component";
import { GetAllTodosResponse, updateUserRequest } from "../../types";
import { useDefaultModalValueStore } from "../hooks/use-default-value-modal";
import userApi from "../api/user-api";
import { useBoolean, useElementSize } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import useTheme from "../hooks/use-theme";

export default function TodoContentComponent() {
  const [cookies] = useCookies(["token"]);
  const { todoIdDefaultValue } = useDefaultModalValueStore();
  const { toggle, value } = useBoolean(false);
  const [elementRef, { height }] = useElementSize();
  const [isList, setIsList] = useState(false);
  const { isDarkVariant } = useTheme();

  const queryClient = useQueryClient();

  const toggleIsList = () => {
    setIsList(!isList);
  };

  const { data, isPending } = useQuery({
    queryKey: ["getAllTodos"],
    queryFn: () => todoApi.getAllTodos(cookies.token),
    retry: false,
  });

  const user = useQuery({
    queryKey: ["GetUserData"],
    queryFn: () => userApi.getUserData(cookies.token),
  });

  const bgMap: Record<string, string> = {
    NONE: "",
    LIGHT: "bg-todo-light",
    DARK: "bg-todo-dark",
    SPACE: "bg-todo-space",
    YELLOW: "bg-todo-yellow",
    SAKURA: "bg-todo-sakura",
    STORK: "bg-todo-stork",
    COLORFULL: "bg-todo-colorfull",
    SHEET: "bg-todo-sheet",
    ROLLPAPER: "bg-todo-rollpaper",
    SKETCH: "bg-todo-sketch",
  };

  const updateUserMutation = useMutation({
    mutationFn: (newUser: updateUserRequest) =>
      userApi.updateCurrentUser(cookies.token, newUser),
    onSuccess: (data, variables) => {
      toast.success(
        `Change background Todo to ${variables.todoBackground?.toLowerCase()}`,
        {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GetUserData"] });
    },
  });

  const variablesCreateTodo = useMutationState({
    filters: { mutationKey: ["createTodo"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const variablesUpdateTodo = useMutationState({
    filters: { mutationKey: ["updateTodo"], status: "pending" },
    select: (mutation) => mutation.state.data,
  });

  const toggleCompletedMutation = useMutation({
    mutationFn: (todoId: string) =>
      todoApi.toggleCompleted(cookies.token, todoId),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAllTodos"],
        }),
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: string) => todoApi.deleteTodo(cookies.token, todoId),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAllTodos"],
        }),
        queryClient.invalidateQueries({ queryKey: ["getUsersAdminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["getUsersDashboard"] }),
      ]),
  });

  // const isServerCrash = error?.message === "Network Error";

  // if (error) {
  //   return (
  //     <div className="gap-2 items-center justify-center flex flex-col h-[90%] md:h-[80%] overflow-x-hidden overflow-y-auto">
  //       {isServerCrash ? (
  //         <ServerCrash className="w-14 h-14" />
  //       ) : (
  //         <DatabaseZap className="w-14 h-14" />
  //       )}
  //       <h1 className="text-md font-bold">
  //         {isServerCrash
  //           ? "Server Crash"
  //           : "Data not found, please add data first!"}
  //       </h1>
  //       <button
  //         className="btn btn-primary btn-sm mt-2"
  //         onClick={() => refetch({ cancelRefetch: false })}
  //       >
  //         <RefreshCcw className="h-4 w-4" /> Retry
  //       </button>
  //     </div>
  //   );
  // }

  const isOptimisticUpdateToggleCompleted = (id: string) => {
    return (
      toggleCompletedMutation.isPending &&
      toggleCompletedMutation.variables === id
    );
  };

  const isOptimisticUpdateDeleteTodo = (id: string) => {
    return deleteTodoMutation.isPending && deleteTodoMutation.variables === id;
  };

  const isOptimisticUpdateUpdateTodo = (id: string) => {
    return variablesUpdateTodo.length !== 0 && todoIdDefaultValue === id;
  };

  return (
    <div
      className={`${
        bgMap[user.data?.todoBackground || "NONE"]
      } relative bg-no-repeat bg-cover flex flex-col h-[90%] md:h-[80%] overflow-x-hidden overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-2 pb-2 pt-1">
        <button className="btn btn-xs btn-ghost" onClick={toggle}>
          <Palette />
        </button>
        <label className="flex w-fit cursor-pointer gap-2 justify-center p-2">
          <Grid />
          <input
            type="checkbox"
            value="synthwave"
            checked={isList}
            onChange={toggleIsList}
            className="toggle theme-controller"
          />
          <List />
        </label>
      </div>
      <ListTodoComponent
        data={data as GetAllTodosResponse}
        isLoading={isPending}
        deleteTodoMutation={deleteTodoMutation}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateUpdateTodo={isOptimisticUpdateUpdateTodo}
        toggleCompletedMutation={toggleCompletedMutation}
        variablesCreateTodo={variablesCreateTodo}
        isList={isList}
      />
      <GridTodoComponent
        data={data as GetAllTodosResponse}
        isList={isList}
        isLoading={isPending}
        deleteTodoMutation={deleteTodoMutation}
        toggleCompletedMutation={toggleCompletedMutation}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
      />
      <AnimatePresence>
        {value && (
          <motion.div
            ref={elementRef}
            animate={{ y: 0 }}
            exit={{ y: height }}
            transition={{ duration: 0.5 }}
            className="flex gap-10 overflow-x-auto absolute bg-base-300 px-4 py-8 w-full bottom-0"
          >
            {Object.keys(bgMap).map((key) => (
              <div
                key={key}
                className={`flex flex-col gap-2 cursor-pointer hover:scale-110 transition-all items-center`}
                onClick={() =>
                  updateUserMutation.mutate({ todoBackground: key })
                }
              >
                {user.data?.todoBackground === key ? (
                  <div className="indicator">
                    <span className="indicator-item rounded-full top-2 right-1 badge-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <div className="avatar">
                      <div
                        className={`${
                          key === "NONE" ? "bg-base-100" : bgMap[key]
                        } flex justify-center items-center w-14 bg-contain rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="avatar">
                    <div
                      className={`${
                        key === "NONE" ? "bg-base-100" : bgMap[key]
                      } w-14 bg-contain rounded-full`}
                    >
                      {updateUserMutation.isPending &&
                        updateUserMutation.variables.todoBackground === key && (
                          <Loader2 className="animate-spin w-full h-full" />
                        )}
                    </div>
                  </div>
                )}
                <p className="font-bold text-md lowercase">{key}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <UpdateTodoModal />
    </div>
  );
}
