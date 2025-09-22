import React, { useState } from 'react';

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';

import { Card, EmptyState, Text } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';

// Design system constants
const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const Home = () => {
  const { colors } = useTheme();
  const [balance] = useState(8000);
  const [recentTransactions] = useState<Transaction[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getIncomeTotal = () => {
    return recentTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getExpenseTotal = () => {
    return Math.abs(
      recentTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    );
  };

  const renderTransaction = (transaction: Transaction, index: number) => (
    <Animated.View
      key={transaction.id}
      entering={FadeInUp.delay(index * 100).duration(300)}
      style={styles.transactionItem}
    >
      <Card style={[styles.transactionCard, { backgroundColor: colors.surface }]}>
        <View style={styles.transactionContent}>
          <View style={styles.transactionLeft}>
            <View
              style={[
                styles.transactionIcon,
                {
                  backgroundColor: transaction.type === 'income' ? colors.success : colors.error,
                },
              ]}
            >
              <Ionicons
                name={transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={colors.onPrimary}
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text variant='bodyLarge' color='primary' style={styles.transactionTitle}>
                {transaction.title}
              </Text>
              <Text variant='bodySmall' color='secondary' style={styles.transactionDate}>
                {transaction.date}
              </Text>
            </View>
          </View>
          <View style={styles.transactionRight}>
            <View
              style={[
                styles.categoryChip,
                {
                  borderColor: colors.outline,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderRadius: borderRadius.sm,
                  paddingHorizontal: spacing.sm,
                  paddingVertical: spacing.xs,
                },
              ]}
            >
              <Text variant='labelSmall' color='secondary'>
                {transaction.category}
              </Text>
            </View>
            <Text
              variant='bodyLarge'
              color={transaction.type === 'income' ? 'success' : 'error'}
              style={styles.transactionAmount}
            >
              {formatCurrency(transaction.amount)}
            </Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Balance Card */}
        <Animated.View entering={FadeInUp.duration(500)}>
          <Card style={[styles.balanceCard, { backgroundColor: colors.primary }]}>
            <View style={styles.balanceContent}>
              <Text
                variant='bodyMedium'
                color='primary'
                style={[styles.balanceLabel, { color: colors.onPrimary }]}
              >
                Current Balance
              </Text>
              <Text
                variant='headlineLarge'
                color='primary'
                style={[styles.balanceAmount, { color: colors.onPrimary }]}
              >
                {formatCurrency(balance)}
              </Text>
              <View style={styles.balanceStats}>
                <View style={styles.statItem}>
                  <Text
                    variant='titleMedium'
                    color='primary'
                    style={[styles.statValue, { color: colors.onPrimary }]}
                  >
                    {formatCurrency(getIncomeTotal())}
                  </Text>
                  <Text
                    variant='bodySmall'
                    color='primary'
                    style={[styles.statLabel, { color: colors.onPrimary }]}
                  >
                    Income
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text
                    variant='titleMedium'
                    color='primary'
                    style={[styles.statValue, { color: colors.onPrimary }]}
                  >
                    {formatCurrency(getExpenseTotal())}
                  </Text>
                  <Text
                    variant='bodySmall'
                    color='primary'
                    style={[styles.statLabel, { color: colors.onPrimary }]}
                  >
                    Expenses
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View entering={FadeInRight.delay(300).duration(400)}>
          <Card style={[styles.transactionsCard, { backgroundColor: colors.surface }]}>
            <View>
              {recentTransactions.length > 0 && (
                <Text variant='titleMedium' color='primary' style={styles.sectionTitle}>
                  Recent Transactions
                </Text>
              )}
              {recentTransactions.length > 0 ? (
                <View style={styles.transactionsList}>
                  {recentTransactions.map((transaction, index) =>
                    renderTransaction(transaction, index)
                  )}
                </View>
              ) : (
                <EmptyState
                  icon='receipt-outline'
                  title='No transactions yet'
                  description='Start tracking your money by adding your first transaction'
                  actionText='Add Transaction'
                  onActionPress={() => console.log('Add transaction')}
                  style={styles.emptyState}
                />
              )}
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => console.log('Add transaction')}
        activeOpacity={0.8}
      >
        <Ionicons name='add' size={24} color={colors.onPrimary} />
      </TouchableOpacity>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  balanceCard: {
    marginBottom: 16,
    elevation: 4,
  },
  balanceContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  transactionsCard: {
    marginBottom: 80,
    elevation: 2,
  },
  transactionsList: {
    gap: 8,
  },
  transactionItem: {
    marginBottom: 8,
  },
  transactionCard: {
    elevation: 1,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  categoryChip: {
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    padding: 16,
    borderRadius: 20,
    right: 0,
    bottom: 0,
  },
  emptyState: {
    paddingVertical: 24,
  },
});
