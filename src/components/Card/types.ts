export type CardVariant = 'elevated' | 'outlined' | 'filled'
export type CardSize = 'small' | 'medium' | 'large'

export interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
  size?: CardSize
  style?: any
  onPress?: () => void
  disabled?: boolean
  padding?: number
  margin?: number
  borderRadius?: number
  elevation?: number
}
