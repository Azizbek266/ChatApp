import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbLdWSSQPlcZ46LE7-cI2SV1oQU6ONNA4",
  apiKey: "AIzaSyC13pMmB6DpksGSZ_GULjyfFmD5af8rZZg",
  authDomain: "quick-5e155.firebaseapp.com",
  projectId: "quick-5e155",
  storageBucket: "quick-5e155.appspot.com",
  messagingSenderId: "612409537290",
  appId: "1:612409537290:web:2d366fa4b769520f0180f3",
  measurementId: "G-E2S5Q48G43"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
