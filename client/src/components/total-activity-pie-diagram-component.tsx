import { useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { Activity, GetUserResponse } from "../../types";
import { downloadJsonFile } from "../lib/download";
import moment from "moment";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface TotalActivityPieDiagramComponentProps {
  data: GetUserResponse;
  showRead: boolean;
  setShowRead: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export const TotalActivityPieDiagramComponent = ({
  data,
  showRead,
  setShowRead,
  isLoading,
}: TotalActivityPieDiagramComponentProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="skeleton rounded-md w-full lg:w-[35%] h-60 p-2"></div>
    );
  }

  const dataGraph = [
    {
      name: "CREATE",
      value: data.activities?.filter((value) => value.method === "CREATE")
        .length,
    },
    {
      name: showRead ? "READ" : undefined,
      value: showRead
        ? data.activities?.filter((value) => value.method === "READ").length
        : undefined,
    },
    {
      name: "UPDATE",
      value: data.activities?.filter((value) => value.method === "UPDATE")
        .length,
    },
    {
      name: "DELETE",
      value: data.activities?.filter((value) => value.method === "DELETE")
        .length,
    },
  ];

  const onPieEnter = (_, index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100 relative -z-[0] rounded-md w-full lg:w-[35%] h-60 flex flex-col justify-center items-center p-2 gap-2"
    >
      <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
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
      <PieChart
        width={400}
        height={400}
        margin={{
          top: 15,
        }}
      >
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={dataGraph}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </motion.div>
  );
};
