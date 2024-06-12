
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyzkZ0usBWJJNhItTLce30Jy5V0Rzc7m8",
    authDomain: "ing-software-baf89.firebaseapp.com",
    projectId: "ing-software-baf89",
    storageBucket: "ing-software-baf89.appspot.com",
    messagingSenderId: "914518231920",
    appId: "1:914518231920:web:1625fe1cfa668f6a86ddb5"
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
