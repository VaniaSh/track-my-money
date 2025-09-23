import { StyleSheet } from 'react-native';

// Bar chart styles
export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 200,
    width: '100%',
    paddingHorizontal: 16,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  barContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    width: 30,
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
