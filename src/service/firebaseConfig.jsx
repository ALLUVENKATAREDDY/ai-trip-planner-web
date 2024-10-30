// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Corrected import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTpuywTtQdcDcfzAPACOkt4FMfwjsBAVI",
  authDomain: "ai-travel-planner-34d1f.firebaseapp.com",
  projectId: "ai-travel-planner-34d1f",
  storageBucket: "ai-travel-planner-34d1f.appspot.com",
  messagingSenderId: "495717102748",
  appId: "1:495717102748:web:482e6f7aa191a113a62959",
  measurementId: "G-4PWC9H7BDF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Correct usage
// const analytics = getAnalytics(app); // Uncomment if needed
