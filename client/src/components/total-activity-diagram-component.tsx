import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Activity, GetUserResponse } from "../../types";
import moment from "moment";
import { Download } from "lucide-react";
import { downloadJsonFile } from "../lib/download";
import { motion } from "framer-motion";

interface TotalActivityDiagramComponentProps {
  data: GetUserResponse;
  showRead: boolean;
  setShowRead: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export const TotalActivityDiagramComponent = ({
  data,
  showRead,
  setShowRead,
  isLoading,
}: TotalActivityDiagramComponentProps) => {
  if (isLoading) {
    return (
      <div className="skeleton rounded-md w-full lg:w-[60%] h-60 p-2"></div>
    );
  }

  // Filter data berdasarkan bulan dan tahun saat ini
  const filterActivitiesByMonth = (add: number = 0, subtract: number = 0) => {
    const filteredActivities = data.activities?.filter((activity) => {
      return moment(new Date(activity.time)).isBetween(
        moment().startOf("year").add(add, "M"),
        moment().endOf("year").subtract(subtract, "M")
      );
    });

    return filteredActivities;
  };

  const dataGraph = [
    {
      name: "January",
      read: filterActivitiesByMonth(0, 11)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(0, 11)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(0, 11)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(0, 11)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "Febuary",
      read: filterActivitiesByMonth(1, 10)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(1, 10)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(1, 10)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(1, 10)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "March",
      read: filterActivitiesByMonth(2, 9)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(2, 9)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(2, 9)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(2, 9)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "April",
      read: filterActivitiesByMonth(3, 8)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(3, 8)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(3, 8)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(3, 8)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "May",
      read: filterActivitiesByMonth(4, 7)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(4, 7)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(4, 7)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(4, 7)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "June",
      read: filterActivitiesByMonth(5, 6)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(5, 6)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(5, 6)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(5, 6)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "July",
      read: filterActivitiesByMonth(6, 5)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(6, 5)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(6, 5)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(6, 5)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "August",
      read: filterActivitiesByMonth(7, 4)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(7, 4)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(7, 4)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(7, 4)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "September",
      read: filterActivitiesByMonth(8, 3)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(8, 3)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(8, 3)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(8, 3)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "October",
      read: filterActivitiesByMonth(9, 2)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(9, 2)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(9, 2)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(9, 2)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "November",
      read: filterActivitiesByMonth(10, 1)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(10, 1)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(10, 1)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(10, 1)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
    {
      name: "December",
      read: filterActivitiesByMonth(11, 0)?.filter(
        (value) => value.method === "READ"
      ).length,
      create: filterActivitiesByMonth(11, 0)?.filter(
        (value) => value.method === "CREATE"
      ).length,
      update: filterActivitiesByMonth(11, 0)?.filter(
        (value) => value.method === "UPDATE"
      ).length,
      delete: filterActivitiesByMonth(11, 0)?.filter(
        (value) => value.method === "DELETE"
      ).length,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100 relative rounded-md w-full lg:w-[60%] h-60 flex flex-col justify-center items-center p-2 gap-2"
    >
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <button onClick={() => setShowRead(!showRead)} className="btn btn-xs">
          {showRead ? "Hide Read" : "Show Read"}
        </button>
        <button
          onClick={() =>
            downloadJsonFile(
              data.activities as Activity[],
              `data-activities-${data.username}-${moment(
                new Date()
              ).calendar()}`
            )
          }
          className="btn btn-xs"
        >
          <Download className="h-3 w-3" /> Export
        </button>
      </div>
      <h4 className="font-bold mt-4">
        {showRead
          ? data.activities?.length
          : data.activities?.filter((value) => value.method !== "READ")
              .length}{" "}
        Total Request
      </h4>
      <LineChart
        width={450}
        height={160}
        data={dataGraph}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {showRead && (
          <Line
            type="monotone"
            dataKey="read"
            stroke="#DC2626"
            activeDot={{ r: 8 }}
          />
        )}
        <Line type="monotone" dataKey="create" stroke="#16A34A" />
        <Line type="monotone" dataKey="update" stroke="#CA8A04" />
        <Line type="monotone" dataKey="delete" stroke="#2563EB" />
      </LineChart>
    </motion.div>
  );
};
