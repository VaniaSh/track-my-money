import { TimePeriod, useFilter } from '@/contexts/FilterContext';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';

const timePeriodOptions: { value: TimePeriod; label: string }[] = [
  { value: '1week', label: '1 Week' },
  { value: '2weeks', label: '2 Weeks' },
  { value: '1month', label: '1 Month' },
];

export const TimePeriodSelector: React.FC = () => {
  const { colors } = useTheme();
  const { filters, setFilters } = useFilter();

  const handlePeriodSelect = (period: TimePeriod) => {
    setFilters({ ...filters, period });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {timePeriodOptions.map((option, index) => {
          const isSelected = filters.period === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.periodButton,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surfaceVariant,
                  borderColor: isSelected ? colors.primary : colors.outline,
                },
                isSelected && styles.selectedButton,
              ]}
              onPress={() => handlePeriodSelect(option.value)}
              activeOpacity={0.8}
            >
              <Text
                variant='bodyMedium'
                color={isSelected ? 'onPrimary' : 'onSurface'}
                style={[styles.buttonText, isSelected && styles.selectedButtonText]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
