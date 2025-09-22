import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { ButtonProps } from './types';

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  fullWidth = false,
}: ButtonProps) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[size]];

    // Apply variant styles
    if (variant === 'primary') {
      baseStyle.push({ backgroundColor: colors.primary });
    } else if (variant === 'secondary') {
      baseStyle.push({ backgroundColor: colors.surfaceVariant });
    } else if (variant === 'outline') {
      baseStyle.push({
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        borderWidth: 1,
      });
    } else if (variant === 'ghost') {
      baseStyle.push({ backgroundColor: 'transparent' });
    } else if (variant === 'danger') {
      baseStyle.push({ backgroundColor: colors.error });
    }

    // Apply disabled state
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    // Apply full width
    if (fullWidth) {
      baseStyle.push({ width: '100%' });
    }

    return baseStyle;
  };

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return colors.primary;
    }
    return colors.onPrimary;
  };

  const getTextSize = () => {
    if (size === 'small') return 'bodySmall';
    if (size === 'large') return 'bodyLarge';
    return 'bodyMedium';
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size='small' color={getTextColor()} style={styles.loading} />
      ) : (
        <View style={styles.button}>
          {leftIcon && (
            <Ionicons
              name={leftIcon as any}
              size={size === 'small' ? 16 : size === 'large' ? 20 : 18}
              color={getTextColor()}
              style={styles.icon}
            />
          )}
          <Text
            variant={getTextSize()}
            color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'onPrimary'}
            style={[
              styles.text,
              size === 'small' && styles.smallText,
              size === 'large' && styles.largeText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && (
            <Ionicons
              name={rightIcon as any}
              size={size === 'small' ? 16 : size === 'large' ? 20 : 18}
              color={getTextColor()}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
