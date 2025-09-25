import { Stack } from 'expo-router'
import { Header } from '@/components'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(profile)/edit/index'
        options={{ header: () => <Header showBackButton title={'Edit'} /> }}
      />
      <Stack.Screen
        name='(profile)/profile/index'
        options={{ header: () => <Header showBackButton title={'Profile'} /> }}
      />
      <Stack.Screen
        name='(profile)/rewards/index'
        options={{ header: () => <Header showBackButton title={'Rewards'} /> }}
      />
      <Stack.Screen
        name='(profile)/settings/index'
        options={{ header: () => <Header showBackButton title={'Settings'} /> }}
      />
      <Stack.Screen
        name='addTransactionsp/index'
        options={{ header: () => <Header showBackButton title={'Add Transactions'} /> }}
      />
    </Stack>
  )
}
