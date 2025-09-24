import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/ui/Button/Button';
import { Text } from '../../components/ui/Text/Text';
import { TextInput } from '../../components/ui/TextInput/TextInput';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from '../../utils/styles/authStyles';
import { LoginFormData, loginSchema } from '../../utils/validationSchemas';

export default function Login() {
  const { colors } = useTheme();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);

    try {
      const result = await login({ email: data.email.trim(), password: data.password });

      if (result.success) {
        router.replace('/(tabs)');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be implemented soon. Please contact support for assistance.',
      [{ text: 'OK' }]
    );
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
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => router.push('/auth/Register')}>
              <Text variant='bodyMedium' color='primary' style={styles.linkText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
