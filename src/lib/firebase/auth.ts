
import { getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from './config';

// Do not export this directly.
const authInstance = getAuth(app);

// Export a function that returns the auth instance.
export const getFirebaseAuth = () => {
    return authInstance;
}

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const auth = getFirebaseAuth();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    return null;
  }
};

export const signUpWithEmail = async (name: string, email: string, password: string) => {
    const auth = getFirebaseAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        return userCredential.user;
    } catch (error) {
        console.error('Error signing up with email and password', error);
        return null;
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Error signing in with email and password', error);
        return null;
    }
}


export const signOut = async () => {
  const auth = getFirebaseAuth();
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
  }
};
