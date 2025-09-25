export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  style?: any
  textStyle?: any
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
}
