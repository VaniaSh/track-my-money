import { TextInputProps } from 'react-native';

export interface SearchInputProps extends Omit<TextInputProps, 'onChangeText' | 'onFocus' | 'onBlur'> {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onClear?: () => void;
  containerStyle?: any;
  showClearButton?: boolean;
  autoFocus?: boolean;
}
