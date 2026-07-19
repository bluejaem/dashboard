import { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth, firestore, isFirebaseConfigured } from '../firebase';

const isBrowser = typeof window !== 'undefined';

export function useRemoteStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = isBrowser && auth?.currentUser;

  useEffect(() => {
    if (!isFirebaseConfigured || !user) {
      setValue(initialValue);
      setLoading(false);
      return;
    }

    const documentRef = doc(firestore, 'userData', `${user.uid}-${key}`);

    const unsubscribe = onSnapshot(
      documentRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setValue(data.payload ?? initialValue);
        } else {
          setValue(initialValue);
        }
        setLoading(false);
      },
      (snapshotError) => {
        console.warn('Realtime sync error:', snapshotError);
        setError(snapshotError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [key, initialValue, user]);

  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;

    async function saveData() {
      try {
        const documentRef = doc(firestore, 'userData', `${user.uid}-${key}`);
        await setDoc(documentRef, {
          payload: value,
          updatedAt: serverTimestamp()
        });
      } catch (saveError) {
        console.warn('Remote save error', saveError);
        setError(saveError);
      }
    }

    saveData();
  }, [key, value, user]);

  return { value, setValue, loading, error };
}
