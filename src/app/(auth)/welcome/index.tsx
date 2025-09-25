import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { Button, Text } from '@/components'
import { useTheme } from '@/contexts/ThemeContext'
import { styles } from './styles'
import { Link } from 'expo-router'

export default function Welcome() {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Ionicons name='wallet' size={60} color={colors.onPrimary} />
        </View>

        <Text variant='headlineLarge' color='primary' style={styles.title}>
          Track My Money
        </Text>

        <Text variant='bodyLarge' color='secondary' style={styles.subtitle}>
          Take control of your finances with our intuitive expense tracking app. Monitor your
          spending, set budgets, and achieve your financial goals.
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name='analytics' size={24} color={colors.primary} />
            <Text variant='bodyMedium' color='primary' style={styles.featureText}>
              Smart Analytics
            </Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name='shield-checkmark' size={24} color={colors.primary} />
            <Text variant='bodyMedium' color='primary' style={styles.featureText}>
              Secure & Private
            </Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name='trending-up' size={24} color={colors.primary} />
            <Text variant='bodyMedium' color='primary' style={styles.featureText}>
              Track Progress
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Link asChild href={'/(auth)/register'}>
            <Button title='Get Started' fullWidth size='large' style={styles.button} />
          </Link>
          <Link asChild href={'/(auth)/login'}>
            <Button
              title='Sign In'
              variant='outline'
              fullWidth
              size='large'
              style={styles.button}
            />
          </Link>
        </View>
      </View>
    </View>
  )
}
