import { useEffect, useState } from "react";
import ReactFlow, { Background, Position } from "reactflow";
import "reactflow/dist/style.css";
import IconReact from "./svg/react-svg";
import IconFirebase from "./svg/firebase-svg";
import IconExpress from "./svg/express-svg";
import IconPrisma from "./svg/prisma-svg";
import IconMysql from "./svg/mysql-svg";
import { Loader2Icon } from "lucide-react";
import useTheme from "../hooks/use-theme";

export const TechStackDiagramComponent = () => {
  const [count, setCount] = useState(1);
  const { isDarkVariant } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      // Melakukan increment pada state dengan modulo 5 untuk membuat looping
      setCount((prevCount) => (prevCount % 5) + 1);
    }, 2000); // Contoh interval setiap 2 detik

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, []); // Efek samping hanya akan dijalankan sekali saat komponen dimount

  const nodes = [
    {
      id: "1",
      data: {
        label: "React Application",
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      data: {
        label: "Firebase",
      },
      position: { x: 100, y: 100 },
      sourcePosition: Position.Left,
    },
    {
      id: "3",
      data: {
        label: "Express",
      },
      position: { x: 400, y: 100 },
    },
    {
      id: "4",
      data: {
        label: "Prisma",
      },
      position: { x: 400, y: 200 },
    },
    {
      id: "5",
      data: {
        label: "MySQL",
      },
      type: "output",
      position: { x: 400, y: 300 },
    },
  ];

  const edges = [
    {
      id: "1-2",
      source: "1",
      target: "2",
      label: "Login OAuth",
      animated: count === 1,
    },
    {
      id: "2-1",
      source: "2",
      target: "1",
      label: "Send User Data",
      animated: count === 2,
    },
    {
      id: "1-3",
      source: "1",
      target: "3",
      label: "Send Request",
      animated: count === 3,
    },
    {
      id: "3-4",
      source: "3",
      target: "4",
      label: "Send Query",
      animated: count === 4,
    },
    {
      id: "4-3",
      source: "4",
      target: "5",
      label: "Send Data Definition Language (DDL)",
      animated: count === 5,
    },
  ];

  const textStatus =
    count === 1
      ? "User Login with OAuth"
      : count === 2
      ? "Sending Data to React"
      : count === 3
      ? "Request to Express API"
      : count === 4
      ? "Sending Query to Prisma"
      : "Compile the Query into DDL and Execute to Database";

  return (
    <div
      id="techstack"
      className="gap-2 relative h-screen mx-16"
    >
      <div className="absolute bottom-10 text-center md:text-left md:left-14 flex justify-center flex-col items-center gap-2 w-full md:w-fit">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <div className="bg-base-300 rounded-md p-4">
            <IconReact
              className={`h-10 w-10 ${
                count === 1 || count === 3 ? "animate-bounce" : ""
              }`}
            />
          </div>
          <div className="bg-base-300 rounded-md p-4">
            <IconFirebase
              className={`h-10 w-10 ${count === 2 ? "animate-bounce" : ""}`}
            />
          </div>
          <div className="bg-base-300 rounded-md p-4">
            <IconExpress
              className={`h-10 w-10 ${count === 4 ? "animate-bounce" : ""}`}
            />
          </div>
          <div className="bg-base-300 rounded-md p-4">
            <IconPrisma
              className={`h-10 w-10 ${count === 5 ? "animate-bounce" : ""}`}
            />
          </div>
          <div className="bg-base-300 rounded-md p-4">
            <IconMysql
              className={`h-10 w-10 ${count === 5 ? "animate-bounce" : ""}`}
            />
          </div>
        </div>
        <p className="font-bold animate-pulse flex items-center gap-3">
          Status: {textStatus} <Loader2Icon className="hidden md:block animate-spin" />{" "}
        </p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        preventScrolling
        maxZoom={1}
        minZoom={1}
        style={{ pointerEvents: "none", height: "h-fit" }}
        nodesDraggable={false}
        panOnDrag={false}
      >
        <Background
          color={isDarkVariant ? "#ffffff" : "#000000"}
          className="animate-pulse"
        />
      </ReactFlow>
    </div>
  );
};
