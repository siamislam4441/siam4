// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDil-9Qb0WoI5M7dp-pn5Fufgb92WBBkt4",
  authDomain: "siam-8b726.firebaseapp.com",
  projectId: "siam-8b726",
  storageBucket: "siam-8b726.firebasestorage.app",
  messagingSenderId: "209903083089",
  appId: "1:209903083089:web:68d824cfafcd435023a270",
  measurementId: "G-4LYKK69266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);