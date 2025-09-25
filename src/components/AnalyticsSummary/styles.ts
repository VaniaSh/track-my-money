import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  mainCard: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  mainValue: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.5,
  },
})
