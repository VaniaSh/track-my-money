import { FilterOptions } from '@/utils/analytics';

export interface AdvancedFiltersProps {
  isVisible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  style?: any;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  style?: any;
}

export interface PeriodOption {
  value: '1week' | '2weeks' | '1month';
  label: string;
}

export interface CategoryOption {
  value: string;
  label: string;
  color: string;
}
