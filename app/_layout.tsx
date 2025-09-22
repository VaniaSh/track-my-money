import { ThemeProvider } from '@/contexts/ThemeContext';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NavigationThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='profile' options={{ headerShown: false }} />
        </Stack>
        <StatusBar style='auto' />
      </NavigationThemeProvider>
    </ThemeProvider>
  );
}
