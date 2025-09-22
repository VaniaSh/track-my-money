import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { EmptyStateProps } from './types';

export const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  onActionPress,
  style,
  iconSize = 40,
  showAction = true,
}: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceVariant }]}>
        <Ionicons name={icon as any} size={iconSize} color={colors.textSecondary} />
      </View>

      <Text
        variant='titleLarge'
        color='primary'
        style={[styles.title, { color: colors.onSurface }]}
      >
        {title}
      </Text>

      {description && (
        <Text
          variant='bodyMedium'
          color='secondary'
          style={[styles.description, { color: colors.textSecondary }]}
        >
          {description}
        </Text>
      )}

      {showAction && actionText && onActionPress && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text
            variant='bodyMedium'
            color='onPrimary'
            style={[styles.actionText, { color: colors.onPrimary }]}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
