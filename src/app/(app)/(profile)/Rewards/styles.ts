import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header Stats
  headerStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  statDivider: {
    width: 1,
    height: 50,
    marginHorizontal: 16,
  },

  // Section
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
})
