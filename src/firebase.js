import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBK37Y9bIRZ2lWkTznVG9OTpo4ynpuyqJY',
  authDomain: 'babble-3edf7.firebaseapp.com',
  projectId: 'babble-3edf7',
  storageBucket: 'babble-3edf7.appspot.com',
  messagingSenderId: '462406828098',
  appId: '1:462406828098:web:d4de2a7dc45fd107d52ddb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
