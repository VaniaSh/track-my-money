export interface RewardProps {
  id: string
  title: string
  description?: string
  points: number
  icon: string
  isActive?: boolean
  onPress?: () => void
}

export interface RewardData {
  id: string
  title: string
  description?: string
  points: number
  icon: string
  isActive: boolean
  requirements?: string
  category: 'achievement' | 'milestone' | 'bonus' | 'streak'
}
