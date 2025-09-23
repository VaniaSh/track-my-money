export interface BarChartData {
  value: number;
  label?: string;
  frontColor?: string;
  gradientColor?: string;
}

export interface FilterOptions {
  period: '1week' | '2weeks' | '1month';
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export const generateMockData = (): BarChartData[] => {
  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const colors = ['#96A78D', '#B6CEB4', '#D9E9CF', '#7A8A6F', '#9BB89A', '#537D5D', '#697565'];
  
  return categories.map((label, index) => ({
    value: Math.floor(Math.random() * 100) + 20,
    label,
    frontColor: colors[index % colors.length],
    gradientColor: colors[index % colors.length] + '80',
  }));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
