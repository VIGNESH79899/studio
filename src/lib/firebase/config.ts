
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'studio-2987385832-3cb1f',
  appId: '1:547445210127:web:fb11ac783e417de5f1b77a',
  apiKey: 'AIzaSyDIx7t-M4TRulAZbgzaXG_C3hqAolME5tk',
  authDomain: 'studio-2987385832-3cb1f.firebaseapp.com',
  measurementId: 'G-7W5G42QL9H',
  storageBucket: 'studio-2987385832-3cb1f.appspot.com',
  messagingSenderId: '547445210127',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
