import { auth, firestore } from '@/firebase/firebase';
import { AuthContextTypes, LoginDto, RegisterDto, User } from '@/types/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docsSnap = await getDoc(docRef);

      if (docsSnap.exists()) {
        const data = docsSnap.data();
        const userData: User = {
          uid: data?.uid || null,
          email: data?.email || null,
          userName: data?.name || null,
        };
        setUser({ ...userData });
      }
      return { success: true };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Auth context error: ', msg);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        // User is signed in, fetch user data
        await updateUserData(firebaseUser.uid);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }: LoginDto) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message: msg };
    }
  };
  const register = async ({ email, password, userName }: RegisterDto) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, 'users', response?.user?.uid), {
        email,
        name: userName,
        uid: response?.user?.uid,
      });
      return { success: true };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message: msg };
    }
  };

  const contextValues: AuthContextTypes = {
    user,
    setUser,
    login,
    register,
    updateUserData,
    logout,
    loading,
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
