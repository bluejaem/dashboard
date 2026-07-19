import { useEffect, useState } from 'react';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    if (!isFirebaseConfigured) return;
    await signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    if (!isFirebaseConfigured) return;
    await signOut(auth);
  };

  return { user, authLoading, signIn, signOutUser, isFirebaseConfigured };
}
