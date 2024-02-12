// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f8411.firebaseapp.com",
  projectId: "mern-blog-f8411",
  storageBucket: "mern-blog-f8411.appspot.com",
  messagingSenderId: "922161858761",
  appId: "1:922161858761:web:6ab6b7b05e3e59ecdd2518",
  measurementId: "G-FKVX0EJLMS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
