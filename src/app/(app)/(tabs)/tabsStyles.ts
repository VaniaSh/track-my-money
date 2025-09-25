import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  searchInput: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  categoryFilter: {
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
  },
  transactionList: {
    flex: 1,
  },
})
