import { useTheme } from '@/contexts/ThemeContext'
import React from 'react'
import { Text as RNText } from 'react-native'
import { styles } from './styles'
import { TextColor, TextProps } from './types'

const Text = ({
  children,
  variant = 'bodyMedium',
  color = 'primary',
  style,
  numberOfLines,
  textAlign,
  fontWeight,
  italic = false,
  underline = false,
  strikethrough = false,
}: TextProps) => {
  const { colors } = useTheme()

  const getTextColor = (colorProp: TextColor) => {
    switch (colorProp) {
      case 'primary':
        return colors.onSurface
      case 'secondary':
        return colors.textSecondary
      case 'tertiary':
        return colors.textTertiary
      case 'onPrimary':
        return colors.onPrimary
      case 'onSecondary':
        return colors.onSecondary
      case 'onTertiary':
        return colors.onTertiary
      case 'error':
        return colors.error
      case 'onError':
        return colors.onError
      case 'success':
        return colors.success
      case 'warning':
        return colors.warning
      case 'info':
        return colors.info
      default:
        return colors.onSurface
    }
  }

  const getTextStyle = () => {
    const baseStyle: any[] = [styles[variant]]

    // Apply text decorations
    if (italic) baseStyle.push(styles.italic)
    if (underline) baseStyle.push(styles.underline)
    if (strikethrough) baseStyle.push(styles.strikethrough)

    // Apply custom fontWeight
    if (fontWeight) {
      baseStyle.push({ fontWeight })
    }

    // Apply text alignment
    if (textAlign) {
      baseStyle.push({ textAlign })
    }

    return baseStyle
  }

  return (
    <RNText
      style={[getTextStyle(), { color: getTextColor(color) }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  )
}

export default Text
