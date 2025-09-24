import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { CategoryFilterProps, CategoryItem } from './types';

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategorySelect,
  onCategoryDeselect,
  style,
  showAllOption = true,
}: CategoryFilterProps) => {
  const { colors } = useTheme();

  const handleCategoryPress = (category: CategoryItem) => {
    if (selectedCategories.includes(category.id)) {
      onCategoryDeselect?.(category.id);
    } else {
      onCategorySelect?.(category.id);
    }
  };

  const isSelected = (categoryId: string) => selectedCategories.includes(categoryId);

  const allCategories = showAllOption
    ? [
        { id: 'all', name: 'All', icon: 'apps-outline' as const, color: colors.primary },
        ...categories,
      ]
    : categories;

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allCategories.map(category => {
          const selected = isSelected(category.id);
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selected ? colors.primary : colors.surfaceVariant,
                  borderColor: selected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={selected ? colors.onPrimary : colors.textSecondary}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: selected ? colors.onPrimary : colors.textSecondary,
                  },
                ]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
