import { Redirect } from 'expo-router'

export default function Index() {
  const isUserAuth = false

  return <Redirect href={isUserAuth ? '/(private)/(tabs)/home' : '/(auth)/welcome'} />
}
