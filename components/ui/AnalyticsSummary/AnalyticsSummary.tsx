import { useTheme } from '@/contexts/ThemeContext';
import { formatCurrency } from '@/utils/analytics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { SummaryCardProps } from './types';

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, style }) => {
  const { colors } = useTheme();
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <View
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}
    >
      <Text
        variant='bodySmall'
        color='secondary'
        style={[styles.cardTitle, { color: colors.textSecondary }]}
      >
        {title}
      </Text>
      <Text
        variant='headlineSmall'
        color='primary'
        style={[styles.cardValue, { color: colors.text }]}
      >
        {formatCurrency(value)}
      </Text>
      {change && (
        <View style={styles.changeContainer}>
          <Ionicons
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={16}
            color={isPositive ? colors.success : colors.error}
          />
          <Text
            variant='bodySmall'
            color={isPositive ? 'success' : 'error'}
            style={[styles.changeText, { color: isPositive ? colors.success : colors.error }]}
          >
            {Math.abs(change)}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default SummaryCard;
