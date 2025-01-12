import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";
import { DonutChartsProps } from "../Types";
import { useCellPieStore } from "../../stores/store";

const DonutCharts: React.FC<DonutChartsProps> = ({ data }) => {
  //Using zustand to change the state of cellPie.
  const { activePieCell, setActivePieCell } = useCellPieStore();

  //Function to calculate total value in the Dataset of fund.
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const [hoveredData, setHoveredData] = useState<{
    name: string;
    value: number;
    color: string;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animateOut, setAnimateOut] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    setAnimateOut(true);
    const timerOut = setTimeout(() => {
      setAnimateOut(false);
      setAnimateIn(true);
    }, 500);
    const timerIn = setTimeout(() => setAnimateIn(false), 1000);
    return () => {
      clearTimeout(timerOut);
      clearTimeout(timerIn);
    };
  }, [data]);

  const handleMouseEnter = (
    data: { name: string; value: number; color: string },
    index: number
  ) => {
    setHoveredData(data);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
    setHoveredIndex(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ position: "relative", width: 250.48, height: 250.48 }}
      className={animateOut ? "puzzle-out" : animateIn ? "puzzle-in" : ""}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            //InnerRadius&OuterRadius will shape it to DONUT.
            innerRadius="75%"
            outerRadius="95%"
            startAngle={90}
            endAngle={450}
            paddingAngle={5}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ outline: "none", cursor: "pointer" }}
                //ForTheCellBorderOfPIE
                strokeWidth={hoveredData?.name === entry.name ? 5 : 0}
                stroke={entry.color}
                onMouseEnter={() => handleMouseEnter(entry, index)}
                onClick={() => setActivePieCell(entry.id)}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {hoveredData ? (
          <div className="flex flex-col items-center">
            <div
              className={`h-[34px] w-[80px] text-white rounded-lg flex justify-center items-center`}
              style={{ backgroundColor: hoveredData.color }}
            >
              <p className="text-lg font-medium leading-normal text-stroke-1">
                {hoveredData.name}
              </p>
            </div>

            <h3 className="text-2xl font-semibold leading-[116.7%]  text-[#373857]">
              {" "}
              ${hoveredData.value.toLocaleString()}
            </h3>
          </div>
        ) : (
          <>
            <p className="text-lg font-medium text-grayDark leading-normal text-stroke-1 ">
              TSP Total
            </p>
            <h3 className="text-2xl font-semibold leading-[116.7%] text-[#373B47]">
              {" "}
              ${total.toLocaleString()}
            </h3>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DonutCharts;
