import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyzkZ0usBWJJNhItTLce30Jy5V0Rzc7m8",
  authDomain: "ing-software-baf89.firebaseapp.com",
  projectId: "ing-software-baf89",
  storageBucket: "ing-software-baf89.appspot.com",
  messagingSenderId: "914518231920",
  appId: "1:914518231920:web:1625fe1cfa668f6a86ddb5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(FirebaseApp)
export const FirebaseAuth = getAuth(FirebaseApp)
