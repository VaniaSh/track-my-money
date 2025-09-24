import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Loading from './auth/Loading';

export default function AuthWrapper() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to main app
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, redirect to auth flow
        router.replace('/auth/Auth');
      }
    }
  }, [user, loading]);

  // Show loading screen while checking authentication state
  return <Loading />;
}
