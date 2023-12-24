import { Users2 } from "lucide-react";
import { GetUserResponse } from "../../types";
import IconTodoLine from "./svg/todo-line-svg";
import IconActivity from "./svg/activity-svg";
import IconSum from "./svg/sum-svg";
import { motion } from "framer-motion";

interface AdminHeaderComponentProps {
  data: GetUserResponse[];
  isLoading: boolean;
  isSuccess: boolean;
}

export const AdminHeaderComponent = ({
  data,
  isLoading,
  isSuccess,
}: AdminHeaderComponentProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between py-8">
        <div className="skeleton w-full md:w-[20%] h-24 rounded-md"></div>
        <div className="skeleton w-full md:w-[20%] h-24 rounded-md"></div>
        <div className="skeleton w-full md:w-[20%] h-24 rounded-md"></div>
        <div className="skeleton w-full md:w-[20%] h-24 rounded-md"></div>
      </div>
    );
  }

  if (isSuccess) {
    const totalTodos = data.reduce(
      (total, item) => total + (item?._count?.todos || 0),
      0
    );
    const totalActivities = data.reduce(
      (total, item) => total + (item?._count?.activities || 0),
      0
    );

    const item = {
      hidden: { y: 40, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };

    return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between py-8">
        <motion.div
          variants={item}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="w-full md:w-[20%] bg-base-100 flex items-center justify-start gap-3 pl-4 py-7 rounded-md"
        >
          <Users2 className="h-8 w-8 p-2 rounded-full bg-red-600/20" />
          <div>
            <p className="font-bold text-sm">{data.length}</p>
            <p className="text-xs">Total users</p>
          </div>
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="w-full md:w-[20%] bg-base-100 flex items-center justify-start gap-3 pl-4 py-7 rounded-md"
        >
          <IconTodoLine className="h-8 w-8 p-2 rounded-full bg-green-600/20" />
          <div>
            <p className="font-bold text-sm">{totalTodos}</p>
            <p className="text-xs">Total Todos</p>
          </div>
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="w-full md:w-[20%] bg-base-100 flex items-center justify-start gap-3 pl-4 py-7 rounded-md"
        >
          <IconActivity className="h-8 w-8 p-2 rounded-full bg-yellow-600/20" />
          <div>
            <p className="font-bold text-sm">{totalActivities}</p>
            <p className="text-xs">Total Activities</p>
          </div>
        </motion.div>
        <motion.div
          variants={item}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="w-full md:w-[20%] bg-base-100 flex items-center justify-start gap-3 pl-4 py-7 rounded-md"
        >
          <IconSum className="h-8 w-8 p-2 rounded-full bg-blue-600/20" />
          <div>
            <p className="font-bold text-xs">{`${
              data.length + totalActivities + totalTodos
            } Row`}</p>
            <p className="text-xs">Total Row in Database</p>
          </div>
        </motion.div>
      </div>
    );
  }
};
