import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { Button, Card, Text, TextInput } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { AddTransactionFormData, PaymentMethod } from './types/AddTransactionTypes';

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

const categories = [
  { id: 'food', name: 'Food', icon: 'restaurant-outline' },
  { id: 'transportation', name: 'Transportation', icon: 'car-outline' },
  { id: 'shopping', name: 'Shopping', icon: 'bag-outline' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film-outline' },
  { id: 'healthcare', name: 'Healthcare', icon: 'medical-outline' },
  { id: 'education', name: 'Education', icon: 'school-outline' },
  { id: 'travel', name: 'Travel', icon: 'airplane-outline' },
  { id: 'utilities', name: 'Utilities', icon: 'flash-outline' },
  { id: 'income', name: 'Income', icon: 'trending-up-outline' },
  { id: 'other', name: 'Other', icon: 'ellipse-outline' },
];

const paymentMethods: PaymentMethod[] = [
  { id: 'cash', name: 'Cash', icon: 'cash-outline' },
  { id: 'debit', name: 'Debit Card', icon: 'card-outline' },
  { id: 'credit', name: 'Credit Card', icon: 'card-outline' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: 'swap-horizontal-outline' },
  { id: 'digital_wallet', name: 'Digital Wallet', icon: 'phone-portrait-outline' },
  { id: 'crypto', name: 'Cryptocurrency', icon: 'logo-bitcoin' },
];

const AddTransaction = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState<AddTransactionFormData>({
    amount: '',
    description: '',
    category: '',
    paymentMethod: '',
    isIncome: false,
    date: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Partial<AddTransactionFormData>>({});

  const formatCurrency = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    if (isNaN(numericAmount)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericAmount);
  };

  const handleAmountChange = (text: string) => {
    // Remove non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleanText.split('.');
    if (parts.length > 2) {
      return;
    }

    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setFormData(prev => ({ ...prev, amount: cleanText }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  const handleDescriptionChange = (text: string) => {
    setFormData(prev => ({ ...prev, description: text }));
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: undefined }));
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: undefined }));
    }
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: undefined }));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
    // Only close on Android when user dismisses the picker
    if (Platform.OS === 'android' && event.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const handleDatePickerDone = () => {
    setShowDatePicker(false);
  };

  const toggleTransactionType = () => {
    setFormData(prev => ({ ...prev, isIncome: !prev.isIncome }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddTransactionFormData> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount is required and must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically save the transaction to your data store
      console.log('Transaction data:', formData);
      Alert.alert('Success', 'Transaction added successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    }
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === formData.category);
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === formData.paymentMethod);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <Card style={[styles.headerCard, { backgroundColor: colors.surface }]}>
            <View style={styles.headerContent}>
              <Text variant='headlineMedium' color='primary' style={styles.headerTitle}>
                Add Transaction
              </Text>
              <Text variant='bodyMedium' color='secondary' style={styles.headerSubtitle}>
                Track your money flow
              </Text>
            </View>
          </Card>
        </Animated.View>

        {/* Transaction Type Toggle */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Card style={[styles.typeCard, { backgroundColor: colors.surface }]}>
            <Text variant='titleMedium' color='primary' style={styles.sectionTitle}>
              Transaction Type
            </Text>
            <View style={styles.typeToggleContainer}>
              <Button
                title='Expense'
                variant={!formData.isIncome ? 'primary' : 'outline'}
                size='medium'
                onPress={() => !formData.isIncome || toggleTransactionType()}
                style={styles.typeButton}
              />
              <Button
                title='Income'
                variant={formData.isIncome ? 'primary' : 'outline'}
                size='medium'
                onPress={() => formData.isIncome || toggleTransactionType()}
                style={styles.typeButton}
              />
            </View>
          </Card>
        </Animated.View>

        {/* Amount Input */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          <Card style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <TextInput
              label='Amount'
              value={formData.amount}
              onChangeText={handleAmountChange}
              placeholder='0.00'
              keyboardType='decimal-pad'
              leftIcon='cash-outline'
              error={errors.amount}
            />
          </Card>
        </Animated.View>

        {/* Description Input */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <Card style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <TextInput
              label='Description'
              value={formData.description}
              onChangeText={handleDescriptionChange}
              placeholder='Enter transaction description...'
              multiline
              numberOfLines={3}
              leftIcon='document-text-outline'
              error={errors.description}
            />
          </Card>
        </Animated.View>

        {/* Category Selection */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)}>
          <Card style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <Text variant='titleMedium' color='primary' style={styles.sectionTitle}>
              Category
            </Text>
            <View style={styles.categoryContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryPill,
                    {
                      backgroundColor:
                        formData.category === category.id ? colors.primary : colors.surfaceVariant,
                      borderColor:
                        formData.category === category.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={16}
                    color={
                      formData.category === category.id ? colors.onPrimary : colors.textSecondary
                    }
                    style={styles.categoryIcon}
                  />
                  <Text
                    variant='bodyMedium'
                    color={formData.category === category.id ? 'onPrimary' : 'secondary'}
                    style={styles.categoryText}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.category && (
              <Text variant='bodySmall' color='error' style={styles.errorText}>
                {errors.category}
              </Text>
            )}
          </Card>
        </Animated.View>

        {/* Payment Method Selection */}
        <Animated.View entering={FadeInUp.delay(500).duration(400)}>
          <Card style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <Text variant='titleMedium' color='primary' style={styles.sectionTitle}>
              Payment Method
            </Text>
            <View style={styles.categoryContainer}>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.categoryPill,
                    {
                      backgroundColor:
                        formData.paymentMethod === method.id
                          ? colors.primary
                          : colors.surfaceVariant,
                      borderColor:
                        formData.paymentMethod === method.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => handlePaymentMethodSelect(method.id)}
                >
                  <Ionicons
                    name={method.icon as any}
                    size={16}
                    color={
                      formData.paymentMethod === method.id ? colors.onPrimary : colors.textSecondary
                    }
                    style={styles.categoryIcon}
                  />
                  <Text
                    variant='bodyMedium'
                    color={formData.paymentMethod === method.id ? 'onPrimary' : 'secondary'}
                    style={styles.categoryText}
                  >
                    {method.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.paymentMethod && (
              <Text variant='bodySmall' color='error' style={styles.errorText}>
                {errors.paymentMethod}
              </Text>
            )}
          </Card>
        </Animated.View>

        {/* Date Selection */}
        <Animated.View entering={FadeInUp.delay(600).duration(400)}>
          <Card style={[styles.inputCard, { backgroundColor: colors.surface }]}>
            <Text variant='titleMedium' color='primary' style={styles.sectionTitle}>
              Date
            </Text>
            <Button
              title={formatDate(formData.date)}
              variant='outline'
              size='large'
              rightIcon='calendar-outline'
              onPress={() => setShowDatePicker(true)}
              style={styles.pickerButton}
            />
          </Card>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.delay(700).duration(400)} style={styles.actionButtons}>
          <Button
            title='Cancel'
            variant='outline'
            size='small'
            onPress={() => router.back()}
            style={styles.actionButton}
          />
          <Button
            title='Add Transaction'
            variant='primary'
            size='small'
            onPress={handleSubmit}
            style={styles.actionButton}
            fullWidth
          />
        </Animated.View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <Card style={[styles.datePickerModal, { backgroundColor: colors.surface }]}>
            <Text variant='titleLarge' color='primary' style={styles.modalTitle}>
              Select Date
            </Text>
            <DateTimePicker
              value={formData.date}
              mode='date'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              style={styles.datePicker}
            />
            <View style={styles.modalButtons}>
              <Button
                title='Cancel'
                variant='outline'
                size='small'
                onPress={() => setShowDatePicker(false)}
                style={styles.modalButton}
              />
              <Button
                title='Done'
                variant='primary'
                size='small'
                onPress={handleDatePickerDone}
                style={styles.modalButton}
              />
            </View>
          </Card>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  headerCard: {
    marginBottom: spacing.lg,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  typeCard: {
    marginBottom: spacing.lg,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  typeToggleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  typeButton: {
    flex: 1,
  },
  inputCard: {
    marginBottom: spacing.lg,
    elevation: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: spacing.xs,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    marginTop: spacing.xs,
    fontSize: 12,
  },
  pickerButton: {
    marginTop: spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  datePickerModal: {
    width: '100%',
    maxWidth: 400,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  datePicker: {
    alignSelf: 'center',
    marginVertical: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
});

export default AddTransaction;
