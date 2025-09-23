import { BarChartData } from '@/utils/analytics';

export interface BarChartProps {
  data: BarChartData[];
  title?: string;
  subtitle?: string;
  onBarPress?: (item: BarChartData, index: number) => void;
  style?: any;
}

export interface ChartHeaderProps {
  title: string;
  subtitle?: string;
  style?: any;
}
