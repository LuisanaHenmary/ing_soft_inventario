import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FirebaseAuth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export const useAuthentication = create(
  persist(
    (set) => ({
      userID: null,
      error: null,
      login: async (email, password) => {
        try {
          const { user: { uid } } = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          set({ userID: uid, error: null });
        } catch (error) {
          window.alert('Ususrio o contraseña incorrectos');
          set({ error: error.message });
        }
      },
      register: async (name, email, password) => {
        try {
          const { user: uid } = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          await setDoc(doc(db, 'users', uid), {
            uid,
            name,
            email,
            rol: '0'
          })
          set({ userID: uid, error: null });
        } catch (error) {
          window.alert('Email ya registrado');
          set({ error: error.message });
        }
      },
      logout: async () => {
        try {
          await signOut(FirebaseAuth);
          set({ userID: null });
        } catch (error) {
          set({ error: error.message });
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);
