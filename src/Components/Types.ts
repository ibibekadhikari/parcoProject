interface DonutDataItem {
  id: number;
  name: string;
  value: number;
  color: string;
}
export interface DonutChartsProps {
  data: DonutDataItem[];
}
type FundData = {
  id: number;
  name: string;
  totalValue: string;
  riskLevel: number;
  examples: string[];
  description: string;
  color: string;
};

export type FundAccordionProps = {
  fundData: FundData[];
};
