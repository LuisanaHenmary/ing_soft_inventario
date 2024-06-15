import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FirebaseAuth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

export const useAuthentication = create(
  persist(
    (set) => ({
      userID: null,
      error: null,
      login: async (email, password) => {
        try {
          const { user } = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          set({ userID: user, error: null });
        } catch (error) {
          set({ error: error.message });
        }
      },
      register: async (email, password) => {
        try {
          const { user } = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
          );
          console.log(user);
          set({ userID: user.uid, error: null });
        } catch (error) {
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
