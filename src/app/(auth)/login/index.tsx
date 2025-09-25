import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Text, TextInput } from '@/components'
import { useTheme } from '@/contexts/ThemeContext'
import { styles } from './styles'
import { LoginFormData, loginSchema } from '@/utils/validationSchemas'

export default function Page() {
  const { colors } = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [loading] = useState(false)
  const [error] = useState('')

  const {
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be implemented soon. Please contact support for assistance.',
      [{ text: 'OK' }]
    )
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.header}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <Ionicons name='wallet' size={40} color={colors.onPrimary} />
          </View>
          <Text variant='headlineLarge' color='primary' style={styles.title}>
            Welcome Back
          </Text>
          <Text variant='bodyLarge' color='secondary' style={styles.subtitle}>
            Sign in to your account to continue tracking your finances
          </Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={[styles.errorContainer, { borderColor: colors.error }]}>
              <Text variant='bodyMedium' color='error' style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label='Email Address'
                  placeholder='Enter your email'
                  value={value}
                  onChangeText={onChange}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  leftIcon='mail'
                  error={errors.email?.message}
                  containerStyle={{ marginBottom: 0 }}
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label='Password'
                  placeholder='Enter your password'
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  leftIcon='lock-closed'
                  rightIcon={showPassword ? 'eye-off' : 'eye'}
                  onRightIconPress={() => setShowPassword(!showPassword)}
                  error={errors.password?.message}
                  containerStyle={{ marginBottom: 0 }}
                />
              )}
            />
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={{ alignSelf: 'flex-end', marginTop: 8 }}
          >
            <Text variant='bodySmall' color='primary' style={styles.linkText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <Button
              title='Sign In'
              loading={loading}
              disabled={loading || !isValid}
              fullWidth
              size='large'
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text variant='bodyMedium' color='secondary' style={styles.footerText}>
            Don&apos;t have an account?{' '}
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text variant='bodyMedium' color='primary' style={styles.linkText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
