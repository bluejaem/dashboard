import { useEffect, useRef, useState } from 'react';
import { auth, firestore, isFirebaseConfigured } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

const isBrowser = typeof window !== 'undefined';

function deepEqual(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function readLocalValue(key, initialValue) {
  if (!isBrowser) return initialValue;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  } catch {
    return initialValue;
  }
}

function writeLocalValue(key, value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('localStorage write error', error);
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readLocalValue(key, initialValue));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const remoteInitializedRef = useRef(false);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (!isBrowser) return;
    const localValue = readLocalValue(key, initialValue);
    setValue(localValue);
    setLoading(false);
  }, [key, initialValue]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      remoteInitializedRef.current = false;
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;

    const documentRef = doc(firestore, 'userData', `${user.uid}-${key}`);
    const unsubscribe = onSnapshot(
      documentRef,
      async (snapshot) => {
        if (!snapshot.exists()) {
          if (!remoteInitializedRef.current) {
            remoteInitializedRef.current = true;
            const localValue = readLocalValue(key, initialValue);
            if (!deepEqual(localValue, initialValue)) {
              try {
                await setDoc(documentRef, {
                  payload: localValue,
                  updatedAt: serverTimestamp()
                });
              } catch (remoteWriteError) {
                console.warn('Remote initialization error', remoteWriteError);
                setError(remoteWriteError);
              }
            }
          }
          setLoading(false);
          return;
        }

        remoteInitializedRef.current = true;
        const remoteData = snapshot.data()?.payload;
        if (remoteData !== undefined && !deepEqual(remoteData, valueRef.current)) {
          setValue(remoteData);
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
    writeLocalValue(key, value);

    if (!isFirebaseConfigured || !user || !remoteInitializedRef.current) return;

    const documentRef = doc(firestore, 'userData', `${user.uid}-${key}`);
    const saveRemote = async () => {
      try {
        await setDoc(documentRef, {
          payload: value,
          updatedAt: serverTimestamp()
        });
      } catch (remoteWriteError) {
        console.warn('Remote save error', remoteWriteError);
        setError(remoteWriteError);
      }
    };

    saveRemote();
  }, [key, value, user]);

  return [value, setValue, { loading, error, remoteUser: user }];
}
