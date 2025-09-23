import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { SectionList, View } from 'react-native';
import { Text } from '../Text/Text';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import { Transaction } from '../TransactionItem/types';
import { styles } from './styles';
import { TransactionSectionListProps } from './types';

export const TransactionSectionList = ({
  sections,
  onTransactionPress,
  onEndReached,
  refreshing,
  onRefresh,
  style,
  showCategory = true,
  showDate = false,
}: TransactionSectionListProps) => {
  const { colors } = useTheme();

  const formatSectionDate = (date: string) => {
    const transactionDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (transactionDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (transactionDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return transactionDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const renderSectionHeader = ({ section }: { section: { title: string; data: Transaction[] } }) => (
    <View
      style={[
        styles.sectionHeader,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text
        variant="titleMedium"
        color="primary"
        style={[styles.sectionTitle, { color: colors.textSecondary }]}
      >
        {formatSectionDate(section.title)}
      </Text>
      <Text
        variant="bodySmall"
        color="secondary"
        style={[styles.sectionSubtitle, { color: colors.textTertiary }]}
      >
        {section.data.length} transaction{section.data.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem
      transaction={item}
      onPress={onTransactionPress}
      showCategory={showCategory}
      showDate={showDate}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text
        variant="bodyLarge"
        color="secondary"
        style={[styles.emptyText, { color: colors.textSecondary }]}
      >
        No transactions found
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderTransaction}
      renderSectionHeader={renderSectionHeader}
      ListEmptyComponent={renderEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  );
};
