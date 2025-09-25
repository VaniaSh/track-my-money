import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
