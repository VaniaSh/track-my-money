import React from 'react';
import { Header } from '@/components/ui';
import { Stack } from 'expo-router';

export default function ProfileLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          header: () => (
            <Header
              title="Profile"
              showBackButton
            />
          ),
        }}
      />
      <Stack.Screen
        name="Rewards/Rewards"
        options={{
          title: 'Rewards',
          header: () => (
            <Header
              title="Rewards"
              showBackButton
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings/Settings"
        options={{
          title: 'Settings',
          header: () => (
            <Header
              title="Settings"
              showBackButton
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditPersonalData/EditProfile"
        options={{
          title: 'Edit Profile',
          header: () => (
            <Header
              title="Edit Profile"
              showBackButton
            />
          ),
        }}
      />
    </Stack>
  );
}
