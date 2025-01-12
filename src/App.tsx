import React, { useState } from "react";
import "./App.css";
import DonutCharts from "./Components/DonutCharts/DonutCharts";
import { TSPdata, LookData, tspFundData, lookFundData } from "./data/FundData";
import FundAccordion from "./Components/MuiAccordion/FundAccordion";

function App() {
  //State to keep switching between TSP and LookUp Holding.
  const [activeHolding, setActiveHolding] = useState<String>("tsp");
  return (
    <div className="flex justify-center items-center p-4 ">
      <div className="bg-white min-h-[892px]  w-[506px] flex  flex-col rounded-md">
        <div className="p-8 flex items-center flex-col">
          <div className="flex justify-between text-[#344767] w-[100%] h-10 items-center flex-row">
            <p
              onClick={() => setActiveHolding("tsp")}
              className={`${
                activeHolding === "tsp" ? "bg-[#F1F1F1]" : ""
              } rounded-full cursor-pointer py-2 px-4 text-lg leading-normal font-medium`}
            >
              TSP Holdings
            </p>
            <p
              onClick={() => setActiveHolding("lookthrough")}
              className={`${
                activeHolding === "lookthrough" ? "bg-[#F1F1F1]" : ""
              } rounded-full cursor-pointer py-2 px-4 text-lg leading-normal font-medium`}
            >
              Look Through Holdings
            </p>
          </div>
          {activeHolding === "tsp" ? (
            <>
              <DonutCharts data={TSPdata} />
              <FundAccordion fundData={tspFundData} />
            </>
          ) : (
            <>
              <DonutCharts data={LookData} />
              <FundAccordion fundData={lookFundData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
