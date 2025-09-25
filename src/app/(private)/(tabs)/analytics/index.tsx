import React from 'react'
import { Text } from '@/components'
import { useTheme } from '@/contexts/ThemeContext'
import { styles } from './styles'
import { View } from 'react-native'

const AnalyticsScreen = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Analytics page</Text>
    </View>
  )
}

export default AnalyticsScreen
