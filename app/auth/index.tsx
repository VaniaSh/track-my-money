import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button/Button';
import { Text } from '../../components/ui/Text/Text';
import { useTheme } from '../../contexts/ThemeContext';

export default function AuthIndex() {
  const { colors } = useTheme();

  const handleLogin = () => {
    router.push('/auth/Login');
  };

  const handleRegister = () => {
    router.push('/auth/Register');
  };

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
          Take control of your finances with our intuitive expense tracking app
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title='Get Started'
            onPress={handleRegister}
            fullWidth
            size='large'
            style={styles.button}
          />

          <Button
            title='Sign In'
            onPress={handleLogin}
            variant='outline'
            fullWidth
            size='large'
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginBottom: 0,
  },
});
