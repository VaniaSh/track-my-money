import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { CardProps } from './types';

export const Card = ({
  children,
  variant = 'elevated',
  size = 'medium',
  style,
  onPress,
  disabled = false,
  padding,
  margin,
  borderRadius,
  elevation,
}: CardProps) => {
  const { colors } = useTheme();

  const getCardStyle = () => {
    const baseStyle: any[] = [styles.card, styles[variant], styles[size]];

    // Apply custom padding
    if (padding !== undefined) {
      baseStyle.push({ padding });
    }

    // Apply custom margin
    if (margin !== undefined) {
      baseStyle.push({ margin });
    }

    // Apply custom border radius
    if (borderRadius !== undefined) {
      baseStyle.push({ borderRadius });
    }

    // Apply custom elevation
    if (elevation !== undefined) {
      baseStyle.push({ elevation });
    }

    // Apply variant-specific styles
    if (variant === 'outlined') {
      baseStyle.push({ borderColor: colors.border });
    }

    return baseStyle;
  };

  const cardContent = <View style={getCardStyle()}>{children}</View>;

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.touchable, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return <View style={[getCardStyle(), style]}>{children}</View>;
};
