import React, { createContext, ReactNode, useContext, useState } from 'react';

export type TimePeriod = '1week' | '2weeks' | '1month';

export interface FilterState {
  period: TimePeriod;
  category?: string;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  isFilterModalVisible: boolean;
  showFilterModal: () => void;
  hideFilterModal: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    period: '1week',
    category: undefined,
  });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const showFilterModal = () => setIsFilterModalVisible(true);
  const hideFilterModal = () => setIsFilterModalVisible(false);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        isFilterModalVisible,
        showFilterModal,
        hideFilterModal,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
