import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { SearchEmptyStateProps } from './types';

export const SearchEmptyState = ({
  type = 'no-results',
  searchQuery,
  onClearSearch,
  onAddTransaction,
  style,
}: SearchEmptyStateProps) => {
  const { colors } = useTheme();

  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: 'search-outline',
          title: 'No transactions found',
          description: searchQuery
            ? `No transactions match "${searchQuery}". Try adjusting your search or filters.`
            : 'No transactions match your current filters.',
          actionText: 'Clear search',
          onActionPress: onClearSearch,
        };
      case 'no-transactions':
        return {
          icon: 'receipt-outline',
          title: 'No transactions yet',
          description: 'Start tracking your money by adding your first transaction.',
          actionText: 'Add transaction',
          onActionPress: onAddTransaction,
        };
      default:
        return {
          icon: 'search-outline',
          title: 'No results',
          description: 'Try adjusting your search or filters.',
          actionText: 'Clear search',
          onActionPress: onClearSearch,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceVariant }]}>
        <Ionicons name={content.icon as any} size={48} color={colors.textSecondary} />
      </View>

      <Text
        variant="titleLarge"
        color="primary"
        style={[styles.title, { color: colors.onSurface }]}
      >
        {content.title}
      </Text>

      <Text
        variant="bodyMedium"
        color="secondary"
        style={[styles.description, { color: colors.textSecondary }]}
      >
        {content.description}
      </Text>

      {content.actionText && content.onActionPress && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={content.onActionPress}
          activeOpacity={0.7}
        >
          <Text
            variant="bodyMedium"
            color="onPrimary"
            style={[styles.actionText, { color: colors.onPrimary }]}
          >
            {content.actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
