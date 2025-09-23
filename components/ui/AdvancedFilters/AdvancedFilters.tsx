import { useTheme } from '@/contexts/ThemeContext';
import { FilterOptions } from '@/utils/analytics';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { AdvancedFiltersProps, CategoryOption, FilterSectionProps, PeriodOption } from './types';

const PERIOD_OPTIONS: PeriodOption[] = [
  { value: '1week', label: '1 Week' },
  { value: '2weeks', label: '2 Weeks' },
  { value: '1month', label: '1 Month' },
];

const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'all', label: 'All Categories', color: '#96A78D' },
  { value: 'food', label: 'Food', color: '#B6CEB4' },
  { value: 'transportation', label: 'Transportation', color: '#D9E9CF' },
  { value: 'shopping', label: 'Shopping', color: '#7A8A6F' },
  { value: 'entertainment', label: 'Entertainment', color: '#9BB89A' },
  { value: 'utilities', label: 'Utilities', color: '#537D5D' },
];

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, style }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.section, style]}>
      <Text variant="bodyLarge" color="primary" style={styles.sectionTitle}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isVisible,
  onClose,
  filters,
  onFiltersChange,
  style,
}) => {
  const { colors } = useTheme();
  const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);

  const handlePeriodChange = (period: '1week' | '2weeks' | '1month') => {
    setTempFilters(prev => ({ ...prev, period }));
  };

  const handleCategoryChange = (category: string) => {
    setTempFilters(prev => ({ 
      ...prev, 
      category: category === 'all' ? undefined : category 
    }));
  };

  const handleClearFilters = () => {
    setTempFilters({
      period: '1week',
      category: undefined,
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
              <View style={styles.header}>
                <Text variant="headlineSmall" color="primary" style={styles.title}>
                  Advanced Filters
                </Text>
                <TouchableOpacity
                  style={[styles.closeButton, { backgroundColor: colors.surfaceVariant }]}
                  onPress={onClose}
                >
                  <Ionicons name="close" size={20} color={colors.onSurface} />
                </TouchableOpacity>
              </View>

              <FilterSection title="Time Period">
                <View style={styles.periodContainer}>
                  {PERIOD_OPTIONS.map((option) => {
                    const isSelected = tempFilters.period === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.periodButton,
                          {
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                            borderColor: isSelected ? colors.primary : colors.outline,
                          },
                          isSelected && styles.selectedPeriod,
                        ]}
                        onPress={() => handlePeriodChange(option.value)}
                        activeOpacity={0.7}
                      >
                        <Text
                          variant="bodyMedium"
                          color={isSelected ? 'onPrimary' : 'primary'}
                          style={styles.periodText}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </FilterSection>

              <FilterSection title="Categories">
                <View style={styles.categoryGrid}>
                  {CATEGORY_OPTIONS.map((category) => {
                    const isSelected = tempFilters.category === category.value || 
                      (category.value === 'all' && !tempFilters.category);
                    return (
                      <TouchableOpacity
                        key={category.value}
                        style={[
                          styles.categoryChip,
                          {
                            backgroundColor: isSelected ? colors.primary : 'transparent',
                            borderColor: isSelected ? colors.primary : colors.outline,
                          },
                          isSelected && styles.selectedChip,
                        ]}
                        onPress={() => handleCategoryChange(category.value)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            { width: 12, height: 12, borderRadius: 6, backgroundColor: category.color },
                            isSelected && { backgroundColor: colors.onPrimary }
                          ]}
                        />
                        <Text
                          variant="bodyMedium"
                          color={isSelected ? 'onPrimary' : 'primary'}
                          style={styles.categoryText}
                        >
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </FilterSection>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.clearButton,
                    { borderColor: colors.outline }
                  ]}
                  onPress={handleClearFilters}
                >
                  <Text
                    variant="bodyLarge"
                    color="primary"
                    style={styles.actionButtonText}
                  >
                    Clear All
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.applyButton,
                    { backgroundColor: colors.primary }
                  ]}
                  onPress={handleApplyFilters}
                >
                  <Text
                    variant="bodyLarge"
                    color="onPrimary"
                    style={styles.actionButtonText}
                  >
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
