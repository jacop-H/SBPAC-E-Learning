import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { GoogleUser } from '../types';

const activeFirebaseConfig = {
  ...firebaseConfig,
  authDomain: 'sbpac-e-learning.firebaseapp.com'
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(activeFirebaseConfig) : getApp();

// Initialize Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore (with databaseId if specified in config)
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Sign in with Google Popup
export async function signInWithGoogle(): Promise<GoogleUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const googleUser: GoogleUser = {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'ผู้ใช้งาน Google',
      email: user.email || '',
      picture: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email || 'user')}`,
      role: 'ผู้ใช้งาน Google Account (Firebase Verified)',
      department: 'ศูนย์เรียนรู้ระบบ SBPAC E-Learning'
    };

    // Sync User Profile to Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: googleUser.email,
      displayName: googleUser.name,
      photoURL: googleUser.picture,
      updatedAt: serverTimestamp()
    }, { merge: true });

    return googleUser;
  } catch (error: any) {
    if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
      console.error("Firebase Google Auth error:", error);
    }
    throw error;
  }
}

// Sign Out
export async function logoutFirebase(): Promise<void> {
  await firebaseSignOut(auth);
}

// Sync user progress with Firestore in real-time
export function subscribeUserProgress(
  userId: string,
  onUpdate: (progressMap: Record<string, string[]>) => void
) {
  try {
    const userProgressRef = doc(db, 'users', userId, 'progress', 'courses');
    return onSnapshot(userProgressRef, (docSnap) => {
      if (docSnap.metadata.hasPendingWrites) return;
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate(data.completedChaptersMap || {});
      } else {
        onUpdate({});
      }
    }, (err) => {
      console.warn("Firestore sync paused for user progress (using local storage fallback):", err?.message || err);
    });
  } catch (err) {
    console.warn("Failed to subscribe user progress:", err);
    return () => {};
  }
}

// Save user progress to Firestore
export async function saveUserProgressToFirestore(
  userId: string,
  completedChaptersMap: Record<string, string[]>
) {
  try {
    const userProgressRef = doc(db, 'users', userId, 'progress', 'courses');
    await setDoc(userProgressRef, {
      completedChaptersMap,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err: any) {
    console.warn("Firestore save paused for user progress (saved locally):", err?.message || err);
  }
}

// Subscribe user bookmarks with Firestore
export function subscribeUserBookmarks(
  userId: string,
  onUpdate: (bookmarks: any[]) => void
) {
  try {
    const bookmarksRef = doc(db, 'users', userId, 'bookmarks', 'items');
    return onSnapshot(bookmarksRef, (docSnap) => {
      if (docSnap.metadata.hasPendingWrites) return;
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate(data.list || []);
      } else {
        onUpdate([]);
      }
    }, (err) => {
      console.warn("Firestore sync paused for user bookmarks (using local storage fallback):", err?.message || err);
    });
  } catch (err) {
    console.warn("Failed to subscribe user bookmarks:", err);
    return () => {};
  }
}

// Save user bookmarks to Firestore
export async function saveUserBookmarksToFirestore(
  userId: string,
  bookmarks: any[]
) {
  try {
    const bookmarksRef = doc(db, 'users', userId, 'bookmarks', 'items');
    await setDoc(bookmarksRef, {
      list: bookmarks,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err: any) {
    console.warn("Firestore save paused for user bookmarks (saved locally):", err?.message || err);
  }
}
