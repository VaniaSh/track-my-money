export type SearchEmptyStateType = 'no-results' | 'no-transactions';

export interface SearchEmptyStateProps {
  type?: SearchEmptyStateType;
  searchQuery?: string;
  onClearSearch?: () => void;
  onAddTransaction?: () => void;
  style?: any;
}
