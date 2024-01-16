import React from "react";
import { GetAllTodosResponse } from "../../types";
import TodoSkeleton from "./skeletons/todo-skeleton";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { truncateString } from "../lib/string";
import {
  BookUser,
  Briefcase,
  CalendarClock,
  Edit,
  MoreHorizontal,
  ShoppingBasket,
  Trash,
} from "lucide-react";
import moment from "moment";
import useOpenModal from "../hooks/use-open-modal";
import { useDefaultModalValueStore } from "../hooks/use-default-value-modal";
import { AnimatePresence, motion } from "framer-motion";

interface ListTodoComponentProps {
  variablesCreateTodo: unknown[];
  data: GetAllTodosResponse;
  isLoading: boolean;
  isOptimisticUpdateUpdateTodo: (id: string) => boolean;
  isOptimisticUpdateDeleteTodo: (id: string) => boolean;
  isOptimisticUpdateToggleCompleted: (id: string) => boolean;
  /* eslint-disable */
  toggleCompletedMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  deleteTodoMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  /* eslint-disable */
  isList: boolean;
}

export const ListTodoComponent = ({
  variablesCreateTodo,
  data,
  isLoading,
  isOptimisticUpdateUpdateTodo,
  isOptimisticUpdateDeleteTodo,
  isOptimisticUpdateToggleCompleted,
  toggleCompletedMutation,
  deleteTodoMutation,
  isList,
}: ListTodoComponentProps) => {
  const { ModalMethod, ModalType, openModal } = useOpenModal();
  const { setCategory, setDescription, setTitle, setTodoId } =
    useDefaultModalValueStore();

  const renderSkeletonElements = () =>
    Array(8)
      .fill(null)
      .map((_, index) => <TodoSkeleton key={index} />);

  if (isLoading && isList) {
    return (
      <div className="flex flex-col h-[90%] md:h-[80%] overflow-x-hidden overflow-y-auto">
        {renderSkeletonElements()}
      </div>
    );
  }

  return (
    <div className={isList ? "block" : "hidden"}>
      {variablesCreateTodo.length !== 0 && <TodoSkeleton />}
      <AnimatePresence>
        {data?.data?.map((value) => (
          <React.Fragment key={value.id}>
            {isOptimisticUpdateUpdateTodo(value.id) ? (
              <TodoSkeleton />
            ) : (
              <>
                <motion.div
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                  className={`flex flex-col sm:flex-row justify-between p-6 gap-4 items-center ${isOptimisticUpdateDeleteTodo(value.id) && "opacity-40"
                    }`}
                >
                  <div className="flex gap-6 items-center">
                    {isOptimisticUpdateToggleCompleted(value.id) ? (
                      <input
                        type="checkbox"
                        checked={!value.completed}
                        disabled
                        className="checkbox checkbox-primary checkbox-md"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={value.completed}
                        onClick={() => toggleCompletedMutation.mutate(value.id)}
                        className="checkbox checkbox-primary checkbox-md"
                      />
                    )}

                    <div>
                      <h3
                        className={`font-bold text-lg flex items-center gap-4`}
                      >
                        {isOptimisticUpdateToggleCompleted(value.id) ? (
                          <p
                            className={`${!value.completed ? "line-through opacity-80" : ""
                              }`}
                          >
                            {truncateString(value.title, 20)}
                          </p>
                        ) : (
                          <p
                            className={`${value.completed ? "line-through opacity-80" : ""
                              }`}
                          >
                            {truncateString(value.title, 20)}
                          </p>
                        )}

                        <div className="flex gap-2 items-center text-xs opacity-50">
                          <CalendarClock className="h-4 w-4" />
                          <p>{moment(value.createdAt).fromNow()}</p>
                          <div className="badge badge-primary rounded">
                            {value.category === "WORK" && (
                              <Briefcase className="h-4 w-4" />
                            )}
                            {value.category === "PERSONAL" && (
                              <BookUser className="h-4 w-4" />
                            )}
                            {value.category === "SHOPPING" && (
                              <ShoppingBasket className="h-4 w-4" />
                            )}
                            {value.category === "OTHER" && (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </h3>
                      <p className="font-semibold text-sm opacity-70 truncate...">
                        {truncateString(value.description, 35)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      className="btn bg-transparent hover:btn-info btn-md"
                      onClick={() => {
                        setTitle(value.title);
                        setDescription(value.description);
                        setCategory(value.category);
                        setTodoId(value.id);
                        openModal(ModalType.TODO, ModalMethod.UPDATE);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="hover:btn-error btn bg-transparent btn-md"
                      disabled={deleteTodoMutation.isPending}
                      onClick={() => deleteTodoMutation.mutate(value.id)}
                    >
                      {isOptimisticUpdateDeleteTodo(value.id) ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
                <div className="divider"></div>
              </>
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
