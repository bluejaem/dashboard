import { useEffect, useState } from 'react';
import { auth, isFirebaseConfigured } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

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

  const signIn = async (email, password) => {
    if (!isFirebaseConfigured) return;
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    if (!isFirebaseConfigured) return;
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  };

  const signOutUser = async () => {
    if (!isFirebaseConfigured) return;
    await signOut(auth);
  };

  return { user, authLoading, authError, signIn, signUp, signOutUser, isFirebaseConfigured };
}
