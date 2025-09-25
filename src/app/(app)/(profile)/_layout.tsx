import React from 'react'
import { Header } from '@/components'
import { Stack } from 'expo-router'

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name='Profile'
        options={{
          title: 'Profile',
          header: () => <Header title='Profile' showBackButton />,
        }}
      />
      <Stack.Screen
        name='Rewards'
        options={{
          title: 'Rewards',
          header: () => <Header title='Rewards' showBackButton />,
        }}
      />
      <Stack.Screen
        name='Settings'
        options={{
          title: 'Settings',
          header: () => <Header title='Settings' showBackButton />,
        }}
      />
      <Stack.Screen
        name='EditPersonalData'
        options={{
          title: 'Edit Profile',
          header: () => <Header title='Edit Profile' showBackButton />,
        }}
      />
    </Stack>
  )
}
