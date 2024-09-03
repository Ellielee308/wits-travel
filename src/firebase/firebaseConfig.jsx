import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics";
import { getInstallations } from "firebase/installations";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "witz-ec201.firebaseapp.com",
  projectId: "witz-ec201",
  storageBucket: "witz-ec201.appspot.com",
  messagingSenderId: "777073842698",
  appId: "1:777073842698:web:73f2a7cd7ba08a9b25ddf3",
  measurementId: "G-VCKK3NXKM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const installations = getInstallations(app);
const storage = getStorage(app);

setAnalyticsCollectionEnabled(analytics, true);

export { app, db, analytics, storage, installations };
