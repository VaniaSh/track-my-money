import { AnalyticsSummary, BarChart, TimePeriodSelector } from '@/components/ui';
import { useFilter } from '@/contexts/FilterContext';
import { useTheme } from '@/contexts/ThemeContext';
import { generateMockData } from '@/utils/analytics';
import React, { useCallback, useMemo, useState } from 'react';
import { Animated, RefreshControl, ScrollView, View } from 'react-native';
import { analyticsStyles } from './analyticsStyles';
import SummaryCard from '@/components/ui/AnalyticsSummary/AnalyticsSummary';

const AnalyticsScreen = () => {
  const { colors } = useTheme();
  const { filters } = useFilter();
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useState(new Animated.Value(1))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  const chartData = useMemo(() => generateMockData(), [filters]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case '1week':
        return '1 Week';
      case '2weeks':
        return '2 Weeks';
      case '1month':
        return '1 Month';
      default:
        return '1 Week';
    }
  };

  return (
    <View style={[analyticsStyles.container, { backgroundColor: colors.background }]}>
      <TimePeriodSelector />
      <ScrollView
        style={analyticsStyles.scrollView}
        contentContainerStyle={analyticsStyles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <SummaryCard title={'Total Spend'} value={443} change={-32} />

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <BarChart
            data={chartData}
            title='Spending Analysis'
            subtitle={`${getPeriodLabel(filters.period)} • ${filters.category || 'All Categories'}`}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen;
