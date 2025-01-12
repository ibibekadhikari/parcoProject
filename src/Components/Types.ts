interface DonutDataItem {
  id: number;
  name: string;
  value: number;
  color: string;
}
export interface DonutChartsProps {
  data: DonutDataItem[];
}
