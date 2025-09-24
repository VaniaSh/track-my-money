import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { SearchInputProps } from './types';

export const SearchInput = ({
  placeholder = 'Search transactions...',
  value,
  onChangeText,
  onFocus,
  onBlur,
  onClear,
  style,
  containerStyle,
  showClearButton = true,
  autoFocus = false,
  ...textInputProps
}: SearchInputProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleClear = () => {
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: isFocused ? colors.primary : colors.border,
            borderWidth: isFocused ? 2 : 1,
          },
          style,
        ]}
      >
        <Ionicons
          name='search-outline'
          size={20}
          color={isFocused ? colors.primary : colors.textSecondary}
          style={styles.searchIcon}
        />

        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.onSurface,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          returnKeyType='search'
          {...textInputProps}
        />

        {showClearButton && value && value.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClear} activeOpacity={0.7}>
            <Ionicons name='close-circle' size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
