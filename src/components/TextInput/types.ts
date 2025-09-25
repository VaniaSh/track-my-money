import { TextInput as RNTextInput } from 'react-native'

export interface TextInputProps {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  label?: string
  error?: string
  leftIcon?: string
  rightIcon?: string
  onRightIconPress?: () => void
  multiline?: boolean
  numberOfLines?: number
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean
  secureTextEntry?: boolean
  editable?: boolean
  style?: any
  inputStyle?: any
  containerStyle?: any
  ref?: React.Ref<RNTextInput>
}
