import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button/Button';
import { Text } from '../../components/ui/Text/Text';
import { TextInput } from '../../components/ui/TextInput/TextInput';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from '../../utils/styles/authStyles';
import { RegisterFormData, registerSchema } from '../../utils/validationSchemas';

export default function Register() {
  const { colors } = useTheme();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    setLoading(true);

    try {
      const result = await register({
        userName: data.userName.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      if (result.success) {
        router.replace('/(tabs)');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              render={({ field: { onChange, onBlur, value } }) => (
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
              render={({ field: { onChange, onBlur, value } }) => (
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
              render={({ field: { onChange, onBlur, value } }) => (
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
              render={({ field: { onChange, onBlur, value } }) => (
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
              onPress={handleSubmit(onSubmit)}
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
            <TouchableOpacity onPress={() => router.push('/auth/Login')}>
              <Text variant='bodyMedium' color='primary' style={styles.linkText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
