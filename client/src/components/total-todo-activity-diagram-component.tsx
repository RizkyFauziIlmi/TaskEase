import { GetUserResponse } from "../../types";
import { PieChartComponent } from "./pie-chart-component";
import { motion } from "framer-motion";

interface TotalActivityDiagramComponentProps {
  data: GetUserResponse;
  isLoading: boolean;
}

export const TotalTodoActivityDiagramComponent = ({
  data,
  isLoading,
}: TotalActivityDiagramComponentProps) => {
  const dataPieChart = [
    {
      name: "OTHER",
      value: data?.todos?.filter((value) => value.category === "OTHER")
        .length as number,
    },
    {
      name: "WORK",
      value: data?.todos?.filter((value) => value.category === "WORK")
        .length as number,
    },
    {
      name: "PERSONAL",
      value: data?.todos?.filter((value) => value.category === "PERSONAL")
        .length as number,
    },
    {
      name: "SHOPPING",
      value: data?.todos?.filter((value) => value.category === "SHOPPING")
        .length as number,
    },
  ];

  const colors = ["#2563EB", "#DC2626", "#16A34A", "#CA8A04"];

  if (isLoading) {
    return (
      <div className="skeleton rounded-md w-full lg:w-[30%] h-60 p-2"></div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100 rounded-md w-full lg:w-[30%] h-60 flex flex-col justify-center items-center p-2"
    >
      <PieChartComponent data={dataPieChart} colors={colors} />
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-1">
          <div className="bg-[#DC2626] h-3 w-3"></div>
          <p className="text-xs">Work</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#16A34A] h-3 w-3"></div>
          <p className="text-xs">Personal</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#CA8A04] h-3 w-3"></div>
          <p className="text-xs">Shopping</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#2563EB] h-3 w-3"></div>
          <p className="text-xs">Other</p>
        </div>
      </div>
    </motion.div>
  );
};
