import React, { useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function TestFirestoreConnection() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const docRef = await addDoc(collection(db, 'testCollection'), {
          testField: 'testValue'
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    testConnection();
  }, []);

  return <div>Check the console for the Firestore connection test result.</div>;
}

export default TestFirestoreConnection;