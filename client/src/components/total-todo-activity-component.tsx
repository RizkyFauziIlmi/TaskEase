import moment from "moment";
import { GetUserResponse, TodoData } from "../../types";
import {
  Briefcase,
  Download,
  MoreHorizontal,
  ShoppingBasket,
  User,
} from "lucide-react";
import { downloadJsonFile } from "../lib/download";
import { motion } from "framer-motion";

interface TotalActivityComponentProps {
  data: GetUserResponse;
  isLoading: boolean;
}

export const TotalTodoActivityComponent = ({
  data,
  isLoading,
}: TotalActivityComponentProps) => {
  const todoCategories: Record<string, string> = {
    WORK: "bg-red-600/20",
    PERSONAL: "bg-green-600/20",
    SHOPPING: "bg-yellow-600/20",
    OTHER: "bg-blue-600/20",
  };

  if (isLoading) {
    return (
      <div className="skeleton w-full lg:w-[65%] h-screen lg:h-60 p-4 rounded-md"></div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-base-100 w-full lg:w-[65%] lg:h-60 flex flex-col justify-between p-4 rounded-md"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold mb-1">Total Task</h4>
          <p className="text-xs">Activity Summary</p>
        </div>
        <button
          className="btn btn-outline btn-sm btn-primary"
          onClick={() =>
            downloadJsonFile(
              data.todos as TodoData[],
              `data-todo-${data.username}-${moment(new Date()).calendar()}`
            )
          }
        >
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
      <div className="flex md:flex-row flex-col gap-6">
        {Object.keys(todoCategories).map((category) => (
          <div
            key={category}
            className={`p-3 flex flex-col gap-3 lg:w-32 rounded-md w-full ${todoCategories[category]}`}
          >
            {/* Gunakan ikon yang sesuai berdasarkan kategori */}
            {category === "WORK" && (
              <Briefcase className="w-6 h-6 p-1 rounded-full text-white bg-red-600" />
            )}
            {category === "PERSONAL" && (
              <User className="w-6 h-6 p-1 rounded-full text-white bg-green-600" />
            )}
            {category === "SHOPPING" && (
              <ShoppingBasket className="w-6 h-6 p-1 rounded-full text-white bg-yellow-600" />
            )}
            {category === "OTHER" && (
              <MoreHorizontal className="w-6 h-6 p-1 rounded-full text-white bg-blue-600" />
            )}
            <p className="font-bold">
              {
                data?.todos?.filter((value) => value.category === category)
                  .length
              }{" "}
              Task
            </p>
            <p className="text-xs">Total {category.toLowerCase()} task</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
