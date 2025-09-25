import React from 'react'
import { styles } from './styles'

import { Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderProps } from './types'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Header = ({
  title = 'Screen',
  showBackButton = false,
  rightAction,
  showProfileButton = false,
  onProfilePress: _onProfilePress,
}: HeaderProps) => {
  const scaleValue = useSharedValue(1)
  const { top } = useSafeAreaInsets()
  const route = useRouter()
  const { colors } = useTheme()

  const handlePress = (callback?: () => void) => {
    scaleValue.value = withSpring(0.95, {}, () => {
      scaleValue.value = withSpring(1)
    })
    callback?.()
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }))

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.primary, paddingTop: top }]}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            {showBackButton && (
              <AnimatedTouchableOpacity
                style={[styles.actionButton, animatedStyle]}
                onPress={() => route.back()}
                activeOpacity={0.7}
              >
                <Ionicons name='arrow-back' size={24} color={colors.onPrimary} />
              </AnimatedTouchableOpacity>
            )}
          </View>

          <View style={styles.centerSection}>
            <Text style={[styles.title, { color: colors.onPrimary }]} numberOfLines={1}>
              {title}
            </Text>
          </View>

          <View style={styles.rightSection}>
            {showProfileButton && (
              <AnimatedTouchableOpacity
                style={[styles.actionButton, animatedStyle]}
                onPress={() => route.push('/(private)/(profile)/profile')}
                activeOpacity={0.7}
              >
                <Ionicons name='person-outline' size={24} color={colors.onPrimary} />
              </AnimatedTouchableOpacity>
            )}
            {rightAction && (
              <AnimatedTouchableOpacity
                style={[styles.actionButton, animatedStyle]}
                onPress={() => handlePress(rightAction.onPress)}
                activeOpacity={0.7}
              >
                <Ionicons name={rightAction.icon as any} size={24} color={colors.onPrimary} />
              </AnimatedTouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  )
}

export default Header
