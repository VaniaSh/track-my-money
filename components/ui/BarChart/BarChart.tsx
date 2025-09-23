import { useTheme } from '@/contexts/ThemeContext';
import { BarChartData } from '@/utils/analytics';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './styles';
import { BarChartProps, ChartHeaderProps } from './types';

const ChartHeader: React.FC<ChartHeaderProps> = ({ title, subtitle, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }, style]}>
      <Text variant='headlineSmall' color='primary' style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      {subtitle && (
        <Text
          variant='bodyMedium'
          color='secondary'
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const BarItem: React.FC<{
  item: BarChartData;
  index: number;
  maxValue: number;
  onPress?: (item: BarChartData, index: number) => void;
}> = ({ item, index, maxValue, onPress }) => {
  const { colors } = useTheme();
  const height = (item.value / maxValue) * 150; // Max height of 150

  return (
    <TouchableOpacity
      style={styles.barItem}
      onPress={() => onPress?.(item, index)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.bar,
          {
            height: Math.max(height, 4), // Minimum height of 4
            backgroundColor: item.frontColor || colors.primary,
          },
        ]}
      />
      <Text
        variant='bodySmall'
        color='secondary'
        style={[styles.barLabel, { color: colors.textSecondary }]}
      >
        {item.label || `${index + 1}`}
      </Text>
      <Text variant='bodySmall' color='primary' style={[styles.barValue, { color: colors.text }]}>
        ${item.value}
      </Text>
    </TouchableOpacity>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title = 'Analytics',
  subtitle,
  onBarPress,
  style,
}) => {
  const { colors } = useTheme();

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.card }, style]}>
        <ChartHeader title={title} subtitle={subtitle} />
        <View style={styles.emptyState}>
          <Ionicons name='bar-chart-outline' size={48} color={colors.textTertiary} />
          <Text variant='bodyMedium' color='tertiary' style={styles.emptyText}>
            No data available
          </Text>
        </View>
      </View>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
        style,
      ]}
    >
      <ChartHeader title={title} subtitle={subtitle} />

      <View style={styles.chartContainer}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <BarItem
              key={index}
              item={item}
              index={index}
              maxValue={maxValue}
              onPress={onBarPress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
