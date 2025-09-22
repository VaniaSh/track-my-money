import { ReactNode } from 'react';

export type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  rightSection?: ReactNode;
  showProfileButton?: boolean;
  onProfilePress?: () => void;
}
