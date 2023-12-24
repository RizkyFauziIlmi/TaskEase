import {
  Briefcase,
  Edit,
  MoreHorizontal,
  ShoppingBasket,
  Trash,
  User,
} from "lucide-react";
import { TodoData } from "../../types";
import { AnimatePresence, motion } from "framer-motion";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useOpenModal from "../hooks/use-open-modal";
import { useDefaultModalValueStore } from "../hooks/use-default-value-modal";
import { truncateString } from "../lib/string";

interface CardTodoComponentProps {
  todo: TodoData[] | undefined;
  title: string;
  /* eslint-disable */
  deleteTodoMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  toggleCompletedMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  /* eslint-disable */
  isOptimisticUpdateToggleCompleted: (id: string) => boolean;
  isOptimisticUpdateDeleteTodo: (id: string) => boolean;
}

export const CardTodoComponent = ({
  todo,
  title,
  deleteTodoMutation,
  toggleCompletedMutation,
  isOptimisticUpdateToggleCompleted,
  isOptimisticUpdateDeleteTodo,
}: CardTodoComponentProps) => {
  const { ModalMethod, ModalType, openModal } = useOpenModal();
  const { setCategory, setTitle, setDescription, setTodoId } =
    useDefaultModalValueStore();

  const iconMap: Record<string, JSX.Element> = {
    WORK: <Briefcase className="h-4 w-4 text-primary" />,
    PERSONAL: <User className="h-4 w-4 text-primary" />,
    SHOPPING: <ShoppingBasket className="h-4 w-4 text-primary" />,
    OTHER: <MoreHorizontal className="h-4 w-4 text-primary" />,
  };

  return (
    <div className="cursor-grab bg-base-300 h-fit flex flex-col justify-between p-2 w-52 rounded-md">
      <div className="mb-2">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          {title} {iconMap[title.toUpperCase()]}
        </h4>
      </div>
      <div className="h-fit max-h-40 flex flex-col gap-2 overflow-auto">
        <AnimatePresence>
          {todo?.map((value) => (
            <motion.div
              key={value.id}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className="bg-base-100 p-2 rounded-md flex items-center justify-between"
            >
              <div className="flex items-center gap-1">
                {isOptimisticUpdateToggleCompleted(value.id) ? (
                  <input
                    type="checkbox"
                    checked={!value.completed}
                    disabled
                    className="checkbox checkbox-primary checkbox-xs"
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={value.completed}
                    onClick={() => toggleCompletedMutation.mutate(value.id)}
                    className="checkbox checkbox-primary checkbox-xs"
                  />
                )}
                {isOptimisticUpdateToggleCompleted(value.id) ? (
                  <p
                    className={`${
                      !value.completed ? "line-through opacity-80" : ""
                    } text-sm font-semibold`}
                  >
                    {truncateString(value.title, 10)}
                  </p>
                ) : (
                  <p
                    className={`${
                      value.completed ? "line-through opacity-80" : ""
                    } text-sm font-semibold`}
                  >
                    {truncateString(value.title, 10)}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => {
                    setTitle(value.title);
                    setDescription(value.description);
                    setCategory(value.category);
                    setTodoId(value.id);
                    openModal(ModalType.TODO, ModalMethod.UPDATE);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </button>
                <button
                  className="btn btn-ghost btn-xs"
                  disabled={deleteTodoMutation.isPending}
                  onClick={() => deleteTodoMutation.mutate(value.id)}
                >
                  {isOptimisticUpdateDeleteTodo(value.id) ? (
                    <span className="loading loading-spinner h-3 w-3"></span>
                  ) : (
                    <Trash className="h-3 w-3" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className={`btn btn-ghost btn-sm justify-start px-0 pl-1 ${
          todo?.length !== 0 && "mt-2"
        }`}
        onClick={() => {
          setCategory(title.toUpperCase());
          openModal(ModalType.TODO, ModalMethod.CREATE);
        }}
      >
        Add more card...
      </button>
    </div>
  );
};
