import { GetAllTodosResponse } from "../../types";
import { CardTodoComponent } from "./card-todo-component";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Reorder, useMotionValue } from "framer-motion";
import { useState } from "react";
import { useRaisedShadow } from "../hooks/use-raised-shadow";
import { useMediaQuery } from "usehooks-ts";

interface GridTodoComponentProps {
  data: GetAllTodosResponse;
  isList: boolean;
  isLoading: boolean;
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

export const GridTodoComponent = ({
  data,
  isList,
  isLoading,
  deleteTodoMutation,
  toggleCompletedMutation,
  isOptimisticUpdateToggleCompleted,
  isOptimisticUpdateDeleteTodo
}: GridTodoComponentProps) => {
  const [items, setItems] = useState([1, 2, 3, 4]);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const isMobile = useMediaQuery("(max-width: 1250px)");

  if (isLoading && !isList) {
    return (
      <div
        className={
          isMobile
            ? "flex flex-col items-center gap-4"
            : "flex items-start flex-row gap-2 pl-2"
        }
      >
        <div className="skeleton h-64 p-2 w-52 rounded-md"></div>
        <div className="skeleton h-64 p-2 w-52 rounded-md"></div>
        <div className="skeleton h-64 p-2 w-52 rounded-md"></div>
        <div className="skeleton h-64 p-2 w-52 rounded-md"></div>
      </div>
    );
  }

  const workTodo = data?.data?.filter((value) => value.category === "WORK");
  const personalTodo = data?.data?.filter(
    (value) => value.category === "PERSONAL"
  );
  const shoppingTodo = data?.data?.filter(
    (value) => value.category === "SHOPPING"
  );
  const otherTodo = data?.data?.filter((value) => value.category === "OTHER");

  const itemCardMap: Record<number, JSX.Element> = {
    1: (
      <CardTodoComponent
        todo={workTodo}
        title="Work"
        deleteTodoMutation={deleteTodoMutation}
        toggleCompletedMutation={toggleCompletedMutation}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
      />
    ),
    2: (
      <CardTodoComponent
        todo={personalTodo}
        title="Personal"
        deleteTodoMutation={deleteTodoMutation}
        toggleCompletedMutation={toggleCompletedMutation}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
      />
    ),
    3: (
      <CardTodoComponent
        todo={shoppingTodo}
        title="Shopping"
        deleteTodoMutation={deleteTodoMutation}
        toggleCompletedMutation={toggleCompletedMutation}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
      />
    ),
    4: (
      <CardTodoComponent
        todo={otherTodo}
        title="Other"
        deleteTodoMutation={deleteTodoMutation}
        toggleCompletedMutation={toggleCompletedMutation}
        isOptimisticUpdateToggleCompleted={isOptimisticUpdateToggleCompleted}
        isOptimisticUpdateDeleteTodo={isOptimisticUpdateDeleteTodo}
      />
    ),
  };

  console.log(items)

  return (
    <div className={`${isList ? "hidden" : "block"}`}>
      <Reorder.Group
        axis={isMobile ? "y" : "x"}
        className={
          isMobile
            ? "flex flex-col items-center gap-4"
            : "flex items-start flex-row gap-2 pl-2"
        }
        values={items}
        onReorder={setItems}
      >
        {items.map((item) => (
          <Reorder.Item key={item} value={item} style={{ boxShadow }}>
            {itemCardMap[item]}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};
