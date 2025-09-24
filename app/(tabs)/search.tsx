import {
  CategoryFilter,
  SearchEmptyState,
  SearchInput,
  TransactionSectionList,
} from '@/components/ui';
import { Transaction } from '@/components/ui/TransactionItem/types';
import { useTheme } from '@/contexts/ThemeContext';
import { mockCategories, mockTransactions } from '@/data/mockTransactions';
import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { styles } from './styles';

const SearchScreen = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [refreshing, setRefreshing] = useState(false);

  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        transaction =>
          transaction.description.toLowerCase().includes(query) ||
          transaction.category.toLowerCase().includes(query)
      );
    }

    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter(transaction => selectedCategories.includes(transaction.category));
    }

    return filtered;
  }, [searchQuery, selectedCategories]);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};

    filteredTransactions.forEach(transaction => {
      const date = transaction.date.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, transactions]) => ({
        title: date,
        data: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      }));
  }, [filteredTransactions]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newSelection = prev.filter(id => id !== 'all');
        if (newSelection.includes(categoryId)) {
          return newSelection.filter(id => id !== categoryId);
        } else {
          return [...newSelection, categoryId];
        }
      });
    }
  };

  const handleCategoryDeselect = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategories(['all']);
  };

  const handleTransactionPress = (transaction: Transaction) => {
    Alert.alert(
      'Transaction Details',
      `${transaction.description}\nAmount: $${Math.abs(transaction.amount).toFixed(2)}\nCategory: ${transaction.category}\nDate: ${new Date(transaction.date).toLocaleDateString()}`,
      [{ text: 'OK' }]
    );
  };

  const handleAddTransaction = () => {
    Alert.alert('Add Transaction', 'This would open the add transaction screen', [{ text: 'OK' }]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const showEmptyState = groupedTransactions.length === 0;
  const hasTransactions = mockTransactions.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <SearchInput
          placeholder='Search transactions...'
          value={searchQuery}
          onChangeText={handleSearchChange}
          onClear={handleClearSearch}
          style={styles.searchInput}
        />

        <CategoryFilter
          categories={mockCategories}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
          onCategoryDeselect={handleCategoryDeselect}
          style={styles.categoryFilter}
        />

        {showEmptyState ? (
          <SearchEmptyState
            type={hasTransactions ? 'no-results' : 'no-transactions'}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
            onAddTransaction={handleAddTransaction}
            style={styles.emptyState}
          />
        ) : (
          <TransactionSectionList
            sections={groupedTransactions}
            onTransactionPress={handleTransactionPress}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            style={styles.transactionList}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;
