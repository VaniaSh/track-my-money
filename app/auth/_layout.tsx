import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Loading from './Loading';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to main app
    if (user && !loading) {
      router.replace('/(tabs)');
    }
  }, [user, loading]);

  // Show loading screen while checking authentication state
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name='Auth' />
        <Stack.Screen name='Login' />
        <Stack.Screen name='Register' />
      </Stack>
      <StatusBar style='auto' />
    </>
  );
}
