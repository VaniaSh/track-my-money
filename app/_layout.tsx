import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Header } from '../components';
import { AuthProvider } from '../contexts/AuthContext';
import { FilterProvider } from '../contexts/FilterContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export const unstable_settings = {
  anchor: 'AuthWrapper',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <NavigationThemeProvider value={DefaultTheme}>
            <Stack>
              <Stack.Screen name='AuthWrapper' options={{ headerShown: false }} />
              <Stack.Screen name='auth' options={{ headerShown: false }} />
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
      </AuthProvider>
    </ThemeProvider>
  );
}
