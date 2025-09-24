import { getFirestore } from '@firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCwbExpzz7fYMTR-PAPYct1btpoeX1Dp8o',
  authDomain: 'trackmymoney-c48f5.firebaseapp.com',
  projectId: 'trackmymoney-c48f5',
  storageBucket: 'trackmymoney-c48f5.firebasestorage.app',
  messagingSenderId: '894237225748',
  appId: '1:894237225748:web:909246fb73ba305c55c801',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const firestore = getFirestore(app);
