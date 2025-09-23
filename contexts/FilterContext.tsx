import React, { ReactNode, createContext, useContext, useState } from 'react';

export type TimePeriod = '1week' | '2weeks' | '1month';

export interface FilterOptions {
  period: TimePeriod;
  category?: string;
}

interface FilterContextType {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  isFilterModalVisible: boolean;
  showFilterModal: () => void;
  hideFilterModal: () => void;
  toggleFilterModal: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    period: '1week',
    category: undefined,
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const showFilterModal = () => setIsFilterModalVisible(true);
  const hideFilterModal = () => setIsFilterModalVisible(false);
  const toggleFilterModal = () => setIsFilterModalVisible(prev => !prev);

  const value: FilterContextType = {
    filters,
    setFilters,
    isFilterModalVisible,
    showFilterModal,
    hideFilterModal,
    toggleFilterModal,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
