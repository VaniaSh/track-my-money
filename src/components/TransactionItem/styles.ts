import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 64,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    marginBottom: 2,
  },
  category: {
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '600',
    fontSize: 16,
  },
})
