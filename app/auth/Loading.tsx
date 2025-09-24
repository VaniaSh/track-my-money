import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from '../../components/ui/Text/Text';
import { useTheme } from '../../contexts/ThemeContext';

export default function Loading() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Ionicons name='wallet' size={60} color={colors.onPrimary} />
        </View>

        <Text variant='headlineLarge' color='primary' style={styles.title}>
          Track My Money
        </Text>

        <ActivityIndicator size='large' color={colors.primary} style={styles.loader} />

        <Text variant='bodyMedium' color='secondary' style={styles.loadingText}>
          Loading...
        </Text>
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
    marginBottom: 32,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
