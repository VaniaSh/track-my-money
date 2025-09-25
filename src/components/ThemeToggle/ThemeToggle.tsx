import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './styles'

interface ThemeToggleProps {
  size?: number
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24 }) => {
  const { toggleTheme, isDark, colors } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.toggleButton, { backgroundColor: colors.surface }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons name={isDark ? 'sunny' : 'moon'} size={size} color={colors.primary} />
    </TouchableOpacity>
  )
}

export default ThemeToggle
