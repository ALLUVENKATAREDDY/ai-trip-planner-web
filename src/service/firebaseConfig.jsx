// src/service/firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import getFirestore

// Firebase configuration object (use your Firebase project details here)
const firebaseConfig = {
  apiKey: "AIzaSyBTpuywTtQdcDcfzAPACOkt4FMfwjsBAVI",
  authDomain: "ai-travel-planner-34d1f.firebaseapp.com",
  projectId: "ai-travel-planner-34d1f",
  storageBucket: "ai-travel-planner-34d1f.appspot.com",
  messagingSenderId: "495717102748",
  appId: "1:495717102748:web:482e6f7aa191a113a62959",
  measurementId: "G-4PWC9H7BDF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);  // Now db is correctly initialized and exported
// Export necessary methods
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
