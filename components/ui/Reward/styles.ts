import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  
  rewardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rewardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  rewardInfo: {
    flex: 1,
  },
  
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  rewardDescription: {
    fontSize: 12,
    fontWeight: '400',
  },
  
  rewardRight: {
    marginLeft: 12,
  },
  
  rewardPoints: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  
  pointsText: {
    fontSize: 14,
    fontWeight: '700',
  },
  
  lockedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
