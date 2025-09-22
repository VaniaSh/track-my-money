import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { ProfileOption } from '@/components/ui/ProfileItem/types';
import { useTheme } from '@/contexts/ThemeContext';

const ProfileItem = ({ ...props }: ProfileOption) => {
  const { id, onPress, disabled, title, icon, value, type, description } = props;

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      key={id}
      style={[styles.optionItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
          <Ionicons name={icon as any} size={24} color={colors.primary} />
        </View>
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: colors.onSurface }]}>{title}</Text>
          {description && (
            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.optionRight}>
        {type === 'toggle' ? (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: colors.onBackground, true: colors.primary }}
            thumbColor={value ? colors.onPrimary : colors.surfaceVariant}
          />
        ) : (
          <Ionicons name='chevron-forward' size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileItem;
