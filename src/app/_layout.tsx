import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { ThemeProvider } from '../contexts/ThemeContext'


export default function RootLayout() {
  return (
    <ThemeProvider>
      <NavigationThemeProvider value={DefaultTheme}>
        <Stack initialRouteName='(app)'>
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(app)' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </NavigationThemeProvider>
    </ThemeProvider>
  )
}
