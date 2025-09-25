import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Text, TextInput } from '@/components'
import { styles } from './styles'
import { RegisterFormData, registerSchema } from '@/utils/validationSchemas'
import { useTheme } from '@/contexts/ThemeContext'

export default function Page() {
  const { colors } = useTheme()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading] = useState(false)
  const [error] = useState('')

  const {
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

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
            Create Account
          </Text>
          <Text variant='bodyLarge' color='secondary' style={styles.subtitle}>
            Join us to start tracking your finances and achieve your financial goals
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
              name='userName'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label='Full Name'
                  placeholder='Enter your full name'
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize='words'
                  autoCorrect={false}
                  leftIcon='person'
                  error={errors.userName?.message}
                  containerStyle={{ marginBottom: 0 }}
                />
              )}
            />
          </View>

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
                  placeholder='Create a password'
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

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  leftIcon='lock-closed'
                  rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={errors.confirmPassword?.message}
                  containerStyle={{ marginBottom: 0 }}
                />
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title='Create Account'
              loading={loading}
              disabled={loading || !isValid}
              fullWidth
              size='large'
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text variant='bodyMedium' color='secondary' style={styles.footerText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
              <Text variant='bodyMedium' color='primary' style={styles.linkText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
