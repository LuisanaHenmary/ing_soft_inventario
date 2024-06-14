import { FirebaseAuth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

export const signUpWithCredentials = async (email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    return resp.user.uid;
  } catch (e) {
    console.log(e.message);
  }
};

export const signInWithCredentials = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return resp.user.uid;
  } catch (e) {
    console.log(e.message);
  }
};

export const onAuthStateHasChanged = () => {
  onAuthStateChanged(FirebaseAuth, user => {
    // if (!user) return setSession({ status: 'no-authenticated', userId: null })

    // setSession({ status: 'authenticated', userId: user!.uid })
  })
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()
