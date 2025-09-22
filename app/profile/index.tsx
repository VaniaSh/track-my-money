import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from './styles';
import {ProfileOption} from "@/components/ui/ProfileItem/types";

const Profile = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const sampleRewards = [
    {
      id: 'first-transaction',
      title: 'First Transaction',
      description: 'Complete your first money transaction',
      points: 25,
      icon: 'star',
      isActive: true,
    },
    {
      id: 'budget-goal',
      title: 'Budget Goal',
      description: 'Meet your monthly budget target',
      points: 100,
      icon: 'checkmark-circle',
      isActive: true,
    },
    {
      id: 'savings-streak',
      title: 'Savings Streak',
      description: 'Save money for 7 consecutive days',
      points: 50,
      icon: 'trophy',
      isActive: false,
    },
    {
      id: 'big-saver',
      title: 'Big Saver',
      description: 'Save $1000 in a single month',
      points: 200,
      icon: 'diamond',
      isActive: false,
    },
  ];


  const profileOptions: ProfileOption[] = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: 'person',
      disabled: false,
      type: 'navigation',
      onPress: () => router.push('/profile/EditPersonalData/EditProfile'),
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and configuration',
      icon: 'settings',
      disabled: false,
      type: 'navigation',
      onPress: () => router.push('/profile/Settings/Settings'),
    },
    {
      id: 'theme',
      title: 'Dark Mode',
      description: 'Switch between light and dark themes',
      icon: 'moon',
      disabled: false,
      type: 'toggle',
      value: isDark,
      onPress: toggleTheme,
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('Help', 'Help center coming soon!'),
    },
    {
      id: 'about',
      title: 'About',
      description: 'App version and information',
      icon: 'information-circle',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('About', 'TrackMyMoney v1.0.0'),
    },
  ];

  const renderProfileOption = (option: ProfileOption) => (
    <TouchableOpacity
      key={option.id}
      style={[styles.optionItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={option.onPress}
      disabled={option.disabled}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name={option.icon as any} size={24} color={colors.primary} />
        </View>
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: colors.onSurface }]}>
            {option.title}
          </Text>
          {option.description && (
            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
              {option.description}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.optionRight}>
        {option.type === 'toggle' ? (
          <Switch
            value={option.value}
            onValueChange={option.onPress}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={option.value ? colors.onPrimary : colors.textSecondary}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.userBlock, { backgroundColor: colors.surface }]}>
        <View style={styles.userInfo}>
          <View style={[styles.userAvatar, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: colors.onSurface }]}>
              John Doe
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              john.doe@example.com
            </Text>
            <Text style={[styles.userStatus, { color: colors.primary }]}>
              Premium Member
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.rewardsSection, { backgroundColor: colors.surface }]}
        onPress={() => {
          router.push('/profile/Rewards/Rewards');
        }}
        activeOpacity={0.7}
      >
        <View style={styles.rewardsHeader}>
          <View style={styles.rewardsTitleContainer}>
            <Ionicons name="gift" size={24} color={colors.primary} />
            <Text style={[styles.rewardsTitle, { color: colors.onSurface }]}>Rewards</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>

        <View style={styles.rewardsProgressContainer}>
          <View style={styles.rewardsProgressInfo}>
            <Text style={[styles.rewardsProgressText, { color: colors.textSecondary }]}>
              {sampleRewards.filter(reward => reward.isActive).length} of {sampleRewards.length} rewards unlocked
            </Text>
            <Text style={[styles.rewardsPointsText, { color: colors.primary }]}>
              {sampleRewards
                .filter(reward => reward.isActive)
                .reduce((sum, reward) => sum + reward.points, 0)
              } points earned
            </Text>
          </View>

          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${(sampleRewards.filter(reward => reward.isActive).length / sampleRewards.length) * 100}%`
                }
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>


      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Settings</Text>
        {profileOptions.map(renderProfileOption)}
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error + '20', borderColor: colors.error }]}
        onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
        ])}
      >
        <Ionicons name="log-out" size={24} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default Profile;
