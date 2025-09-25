export interface ProfileOption {
  id: string
  title: string
  description?: string
  icon: string
  disabled: boolean
  type: 'navigation' | 'toggle' | 'action'
  value?: boolean
  onPress?: () => void
}
