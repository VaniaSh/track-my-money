export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'onPrimary'
  | 'onSecondary'
  | 'onTertiary'
  | 'error'
  | 'onError'
  | 'success'
  | 'warning'
  | 'info';

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  style?: any;
  numberOfLines?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}
