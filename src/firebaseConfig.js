// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeOHty3CVZ6UW2WgO9qEO3lzXngSYxR94",
  authDomain: "minha-arte-taty-salvatore.firebaseapp.com",
  projectId: "minha-arte-taty-salvatore",
  storageBucket: "minha-arte-taty-salvatore.firebasestorage.app",
  messagingSenderId: "492280420770",
  appId: "1:492280420770:web:79de7585b01105fdf7bafb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
