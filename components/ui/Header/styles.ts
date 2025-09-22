import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 9,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButton: {
    padding: 6,
    borderRadius: 20,
  },
});
