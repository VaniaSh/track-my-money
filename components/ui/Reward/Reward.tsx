import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { RewardProps } from './types';

export const Reward: React.FC<RewardProps> = ({
  id,
  title,
  description,
  points,
  icon,
  isActive = false,
  onPress,
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    if (isActive && onPress) {
      onPress();
    } else if (isActive) {
      // Default navigation to rewards screen
      router.push('/rewards' as any);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.rewardItem,
        {
          backgroundColor: isActive ? colors.surface : colors.surfaceVariant,
          borderColor: isActive ? colors.primary : colors.border,
          opacity: isActive ? 1 : 0.6,
        },
      ]}
      onPress={handlePress}
      disabled={!isActive}
      activeOpacity={isActive ? 0.7 : 1}
    >
      <View style={styles.rewardLeft}>
        <View
          style={[
            styles.rewardIcon,
            {
              backgroundColor: isActive 
                ? colors.primary + '20' 
                : colors.textSecondary + '20',
            },
          ]}
        >
          <Ionicons
            name={icon as any}
            size={20}
            color={isActive ? colors.primary : colors.textSecondary}
          />
        </View>
        <View style={styles.rewardInfo}>
          <Text
            style={[
              styles.rewardTitle,
              {
                color: isActive ? colors.onSurface : colors.textSecondary,
              },
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={[
                styles.rewardDescription,
                {
                  color: isActive ? colors.textSecondary : colors.textTertiary,
                },
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.rewardRight}>
        {isActive ? (
          <View
            style={[
              styles.rewardPoints,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.pointsText,
                { color: colors.onPrimary },
              ]}
            >
              +{points}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.lockedIcon,
              { backgroundColor: colors.textSecondary + '20' },
            ]}
          >
            <Ionicons
              name="lock-closed"
              size={16}
              color={colors.textSecondary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
