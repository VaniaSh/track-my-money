import { ThemeProvider } from '@/contexts/ThemeContext'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

const InitialLayout = () => {
  return <Slot />
}

export default function RootLayoutNav() {
  return (
    <ThemeProvider>
      <InitialLayout />
      <StatusBar style='auto' />
    </ThemeProvider>
  )
}
