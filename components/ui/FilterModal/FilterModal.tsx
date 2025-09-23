import { TimePeriod, useFilter } from '@/contexts/FilterContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Dimensions, Modal, TouchableOpacity, View } from 'react-native';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { styles } from './styles';

const { height: screenHeight } = Dimensions.get('window');

const timePeriodOptions: { value: TimePeriod; label: string }[] = [
  { value: '1week', label: '1 Week' },
  { value: '2weeks', label: '2 Weeks' },
  { value: '1month', label: '1 Month' },
];

export const FilterModal: React.FC = () => {
  const { colors } = useTheme();
  const { filters, setFilters, isFilterModalVisible, hideFilterModal } = useFilter();

  const handlePeriodSelect = (period: TimePeriod) => {
    setFilters({ ...filters, period });
  };

  const handleApply = () => {
    hideFilterModal();
  };

  const handleReset = () => {
    setFilters({ period: '1week', category: undefined });
  };

  return (
    <Modal
      visible={isFilterModalVisible}
      transparent
      animationType="slide"
      onRequestClose={hideFilterModal}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={hideFilterModal}
        />
        <Animated.View style={[styles.modal, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <Text variant="headlineSmall" color="primary" style={styles.title}>
              Filter Analytics
            </Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.surfaceVariant }]}
              onPress={hideFilterModal}
            >
              <Ionicons name="close" size={20} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text variant="titleMedium" color="primary" style={styles.sectionTitle}>
                Time Period
              </Text>
              <View style={styles.optionsContainer}>
                {timePeriodOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      {
                        backgroundColor: filters.period === option.value 
                          ? colors.primary + '20' 
                          : colors.surfaceVariant,
                        borderColor: filters.period === option.value 
                          ? colors.primary 
                          : colors.outline,
                      }
                    ]}
                    onPress={() => handlePeriodSelect(option.value)}
                  >
                    <Text
                      variant="bodyMedium"
                      color={filters.period === option.value ? 'primary' : 'secondary'}
                      style={[
                        styles.optionText,
                        filters.period === option.value && styles.selectedOptionText
                      ]}
                    >
                      {option.label}
                    </Text>
                    {filters.period === option.value && (
                      <Ionicons 
                        name="checkmark" 
                        size={16} 
                        color={colors.primary} 
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              title="Reset"
              variant="outline"
              onPress={handleReset}
              style={styles.resetButton}
            />
            <Button
              title="Apply Filters"
              variant="primary"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
