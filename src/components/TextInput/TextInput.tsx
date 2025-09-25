import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import React, { forwardRef } from 'react'
import { TextInput as RNTextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../Text/Text'
import { TextInputProps } from './types'

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      multiline = false,
      numberOfLines = 1,
      keyboardType = 'default',
      autoCapitalize = 'sentences',
      autoCorrect = true,
      secureTextEntry = false,
      editable = true,
      inputStyle,
      containerStyle,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme()

    const getInputStyle = () => {
      const baseStyle: any[] = [styles.input, inputStyle]

      if (multiline) {
        baseStyle.push(styles.multilineInput)
      }

      if (!editable) {
        baseStyle.push(styles.disabledInput)
      }

      return baseStyle
    }

    const getContainerStyle = () => {
      const baseStyle: any[] = [
        styles.container,
        {
          borderColor: error ? colors.error : colors.border,
          backgroundColor: editable ? colors.surface : colors.surfaceVariant,
        },
        containerStyle,
      ]

      return baseStyle
    }

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text variant='bodyMedium' color='primary' style={styles.label}>
            {label}
          </Text>
        )}
        <View style={getContainerStyle()}>
          {leftIcon && (
            <Ionicons
              name={leftIcon as any}
              size={20}
              color={colors.textSecondary}
              style={styles.leftIcon}
            />
          )}
          <RNTextInput
            ref={ref}
            style={getInputStyle()}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textTertiary}
            multiline={multiline}
            verticalAlign={'top'}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            editable={editable}
            {...props}
          />
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIconContainer}
              disabled={!onRightIconPress}
            >
              <Ionicons
                name={rightIcon as any}
                size={20}
                color={colors.textSecondary}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text variant='bodySmall' color='error' style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    )
  }
)

export default TextInput

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.6,
  },
  leftIcon: {
    paddingVertical: 12,
    alignSelf: 'flex-start',
    marginRight: 12,
  },
  rightIconContainer: {
    padding: 4,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
})
