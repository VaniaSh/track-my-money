import { Reward } from '@/components/ui';
import { RewardData } from '@/components/ui/Reward/types';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

const Rewards = () => {
  const { colors } = useTheme();
  const [activeRewards, setActiveRewards] = useState<string[]>([
    'first-transaction',
    'budget-goal',
  ]);

  const rewardsData: RewardData[] = [
    {
      id: 'first-transaction',
      title: 'First Transaction',
      description: 'Complete your first money transaction',
      points: 25,
      icon: 'star',
      isActive: activeRewards.includes('first-transaction'),
      category: 'achievement',
    },
    {
      id: 'budget-goal',
      title: 'Budget Goal',
      description: 'Meet your monthly budget target',
      points: 100,
      icon: 'checkmark-circle',
      isActive: activeRewards.includes('budget-goal'),
      category: 'milestone',
    },
    {
      id: 'savings-streak',
      title: 'Savings Streak',
      description: 'Save money for 7 consecutive days',
      points: 50,
      icon: 'trophy',
      isActive: activeRewards.includes('savings-streak'),
      category: 'streak',
    },
    {
      id: 'big-saver',
      title: 'Big Saver',
      description: 'Save $1000 in a single month',
      points: 200,
      icon: 'diamond',
      isActive: activeRewards.includes('big-saver'),
      category: 'milestone',
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Set up your first budget before 9 AM',
      points: 30,
      icon: 'sunny',
      isActive: activeRewards.includes('early-bird'),
      category: 'bonus',
    },
    {
      id: 'consistency-king',
      title: 'Consistency King',
      description: 'Track expenses for 30 days straight',
      points: 150,
      icon: 'calendar',
      isActive: activeRewards.includes('consistency-king'),
      category: 'streak',
    },
  ];

  const handleRewardPress = (rewardId: string) => {
    Alert.alert('Reward Claimed!', `You've earned points for completing this achievement!`, [
      {
        text: 'Awesome!',
        onPress: () => {
          // Here you would typically claim the reward
          console.log(`Reward ${rewardId} claimed!`);
        },
      },
    ]);
  };

  const activeRewardsCount = activeRewards.length;
  const totalPoints = rewardsData
    .filter(reward => activeRewards.includes(reward.id))
    .reduce((sum, reward) => sum + reward.points, 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Stats */}
      <View style={[styles.headerStats, { backgroundColor: colors.primary }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.onPrimary }]}>{activeRewardsCount}</Text>
          <Text style={[styles.statLabel, { color: `${colors.onPrimary}CC` }]}>Active Rewards</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: `${colors.onPrimary}30` }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.onPrimary }]}>{totalPoints}</Text>
          <Text style={[styles.statLabel, { color: `${colors.onPrimary}CC` }]}>Total Points</Text>
        </View>
      </View>

      {/* Rewards List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Available Rewards</Text>
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: `${colors.primary}20` }]}
            onPress={() => Alert.alert('Toggle Mode', 'Toggle rewards on/off for testing')}
          >
            <Ionicons name='settings' size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {rewardsData.map(reward => (
          <Reward
            key={reward.id}
            id={reward.id}
            title={reward.title}
            description={reward.description}
            points={reward.points}
            icon={reward.icon}
            isActive={reward.isActive}
            onPress={() => handleRewardPress(reward.id)}
          />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[
              styles.quickAction,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => setActiveRewards(rewardsData.map(r => r.id))}
          >
            <Ionicons name='lock-open' size={24} color={colors.primary} />
            <Text style={[styles.quickActionText, { color: colors.onSurface }]}>Unlock All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.quickAction,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => setActiveRewards([])}
          >
            <Ionicons name='lock-closed' size={24} color={colors.primary} />
            <Text style={[styles.quickActionText, { color: colors.onSurface }]}>Lock All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default Rewards;
