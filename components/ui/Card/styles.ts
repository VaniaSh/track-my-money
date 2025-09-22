import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  // Variants
  elevated: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outlined: {
    borderWidth: 1,
    elevation: 0,
  },
  filled: {
    elevation: 0,
  },

  // Sizes
  small: {
    padding: 12,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 20,
  },

  // Touchable
  touchable: {
    borderRadius: 12,
  },
});
