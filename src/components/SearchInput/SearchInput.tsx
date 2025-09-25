import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { SearchInputProps } from './types'

const SearchInput = ({
  placeholder = 'Search transactions...',
  value,
  onChangeText,
  onClear,
  containerStyle,
  showClearButton = true,
  autoFocus = false,
  ...textInputProps
}: SearchInputProps) => {
  const { colors } = useTheme()

  const handleClear = () => {
    onChangeText?.('')
    onClear?.()
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Ionicons name='search-outline' size={20} style={styles.searchIcon} />

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
  )
}

export default SearchInput
