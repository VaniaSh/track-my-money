import { Transaction } from '../TransactionItem/types'

export interface TransactionSection {
  title: string
  data: Transaction[]
}

export interface TransactionSectionListProps {
  sections: TransactionSection[]
  onTransactionPress?: (transaction: Transaction) => void
  onEndReached?: () => void
  refreshing?: boolean
  onRefresh?: () => void
  style?: any
  showCategory?: boolean
  showDate?: boolean
}
