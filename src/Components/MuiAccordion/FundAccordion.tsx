import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCellPieStore } from "../../stores/store";

type FundData = {
  id: number;
  name: string;
  totalValue: string;
  riskLevel: number;
  examples: string[];
  description: string;
  color: string;
};

type FundAccordionProps = {
  fundData: FundData[];
};

const FundAccordion: React.FC<FundAccordionProps> = ({ fundData }) => {
  const { activePieCell } = useCellPieStore();
  const [manuallyExpanded, setManuallyExpanded] = React.useState<number[]>([]);
  React.useEffect(() => {
    if (activePieCell !== null && !manuallyExpanded.includes(activePieCell)) {
      setManuallyExpanded((prev) => [...prev, activePieCell]);
    }
  }, [activePieCell]);

  const handleClick = (id: number) => {
    setManuallyExpanded((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between px-4">
        <p className="text-grayMedium text-lg font-medium leading-normal">
          Items
        </p>
        <p className="text-grayMedium text-lg font-medium leading-normal">
          Total Value
        </p>
      </div>
      {fundData.map((fund, index) => (
        <Accordion
          sx={{ boxShadow: "none" }}
          key={index}
          expanded={manuallyExpanded.includes(fund.id)}
          style={{
            backgroundColor: manuallyExpanded.includes(fund.id)
              ? "#F9F9F9"
              : "",
            boxShadow: manuallyExpanded.includes(fund.id)
              ? "1px 1px 1px #D2D7DB"
              : "",
          }}
          className={`rounded-lg shadow-md `}
        >
          <div className="">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              onClick={() => handleClick(fund.id)}
              className=""
            >
              <p
                className="font-semibold h-[34px] w-[80px] border px-3 py-1 rounded-lg "
                style={{
                  backgroundColor: fund.color,
                }}
              >
                <span className={` text-offWhite `}>{fund.name}</span>
              </p>
              <p className="ml-auto text-lg font-medium text-gray-600">
                {fund.totalValue}
              </p>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <div className="space-y-2 text-sm bg-white p-4 rounded-lg border-2">
              <div className="border-b-2 p-2">
                <span className="font-semibold text-grayMedium">
                  Risk Level:
                </span>{" "}
                <span className="text-grayDark font-medium">
                  {fund.riskLevel}
                </span>
              </div>
              <div className="border-b-2 p-2">
                <span className="font-semibold text-grayMedium ">
                  Examples:
                </span>{" "}
                <span className="text-grayDark font-medium">
                  {fund.examples.join(", ")}
                </span>
              </div>
              <div className="p-2">
                <span className="font-semibold text-grayMedium">
                  Description:
                </span>{" "}
                <span className="text-grayDark font-medium">
                  {fund.description}
                </span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FundAccordion;
