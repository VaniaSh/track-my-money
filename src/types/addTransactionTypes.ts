export interface AddTransactionFormData {
  amount: string
  description: string
  category: string
  paymentMethod: string
  isIncome: boolean
  date: Date
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
}

export interface Category {
  id: string
  name: string
  icon: string
}

export type TransactionType = 'income' | 'expense'
