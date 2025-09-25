import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack initialRouteName='Welcome'>
      <Stack.Screen name='Welcome' />
      <Stack.Screen name='Login' />
      <Stack.Screen name='Register' />
    </Stack>
  )
}
