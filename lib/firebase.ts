import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com` : undefined,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com` : undefined
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Database | null = null;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getDatabase(app);
  } catch (err) {
    console.warn("Firebase initialization skipped or failed:", err);
  }
}

export { auth, db };
