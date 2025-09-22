import ProfileItem from "@/components/ui/ProfileItem/ProfileItem";
import { ProfileOption } from '@/components/ui/ProfileItem/types';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';

const SettingsScreen = () => {
  const { colors, toggleTheme, isDark } = useTheme();

  const settingsOptions: ProfileOption[] = [
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
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      icon: 'notifications',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('Notifications', 'Notification settings coming soon!'),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your privacy settings',
      icon: 'shield-checkmark',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon!'),
    },
    {
      id: 'data',
      title: 'Data & Storage',
      description: 'Manage your data and storage settings',
      icon: 'server',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('Data', 'Data settings coming soon!'),
    },
    {
      id: 'backup',
      title: 'Backup & Sync',
      description: 'Backup your data to the cloud',
      icon: 'cloud-upload',
      disabled: false,
      type: 'navigation',
      onPress: () => Alert.alert('Backup', 'Backup settings coming soon!'),
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>General</Text>
        {settingsOptions.slice(0, 2).map((el) => <ProfileItem key={el.id} {...el} />)}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Privacy & Security</Text>
        {settingsOptions.slice(2, 5).map((el) => <ProfileItem key={el.id} {...el} />)}

      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Support</Text>
        {settingsOptions.slice(5).map((el) => <ProfileItem key={el.id} {...el} />)}

      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default SettingsScreen;
