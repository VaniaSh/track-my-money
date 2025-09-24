import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { TransactionItemProps } from './types';

export const TransactionItem = ({
  transaction,
  onPress,
  style,
  showCategory = true,
  showDate = false,
}: TransactionItemProps) => {
  const { colors } = useTheme();

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      food: 'restaurant-outline',
      transportation: 'car-outline',
      shopping: 'bag-outline',
      entertainment: 'film-outline',
      healthcare: 'medical-outline',
      education: 'school-outline',
      travel: 'airplane-outline',
      utilities: 'flash-outline',
      income: 'trending-up-outline',
      other: 'ellipse-outline',
    };
    return iconMap[category.toLowerCase()] || 'ellipse-outline';
  };

  const isIncome = transaction.amount > 0;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
        style,
      ]}
      onPress={() => onPress?.(transaction)}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isIncome ? colors.success + '20' : colors.error + '20',
            },
          ]}
        >
          <Ionicons
            name={getCategoryIcon(transaction.category) as any}
            size={20}
            color={isIncome ? colors.success : colors.error}
          />
        </View>

        <View style={styles.textContent}>
          <Text variant='bodyLarge' color='primary' numberOfLines={1} style={styles.title}>
            {transaction.description}
          </Text>

          {showCategory && (
            <Text variant='bodySmall' color='secondary' numberOfLines={1} style={styles.category}>
              {transaction.category}
            </Text>
          )}

          {showDate && (
            <Text variant='bodySmall' color='tertiary' style={styles.date}>
              {formatDate(transaction.date)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightContent}>
        <Text
          variant='bodyLarge'
          color={isIncome ? 'success' : 'error'}
          style={[styles.amount, { color: isIncome ? colors.success : colors.error }]}
        >
          {formatAmount(transaction.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
