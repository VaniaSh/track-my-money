export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
  style?: any;
  showCategory?: boolean;
  showDate?: boolean;
}
