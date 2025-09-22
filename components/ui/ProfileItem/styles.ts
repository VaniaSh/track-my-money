import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  optionText: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },

  optionDescription: {
    fontSize: 14,
    fontWeight: '400',
  },

  optionRight: {
    marginLeft: 12,
  },
})
