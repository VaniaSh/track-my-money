import { FilterProvider } from '@/contexts/FilterContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Header } from '@/components';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <NavigationThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='profile' options={{ headerShown: false }} />
            <Stack.Screen
              name='add-transaction'
              options={{
                headerShown: true,
                header: () => <Header showBackButton title={'Add Transaction'} />,
              }}
            />
          </Stack>
          <StatusBar style='auto' />
        </NavigationThemeProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
