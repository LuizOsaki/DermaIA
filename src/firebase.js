// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwFE6Tr9xqhXwoih3592fGIwzTneXiMio",
  authDomain: "dermaia-f55bc.firebaseapp.com",
  projectId: "dermaia-f55bc",
  storageBucket: "dermaia-f55bc.firebasestorage.app", 
  messagingSenderId: "198823860500",
  appId: "1:198823860500:web:e30d0506df821f09b9ca01",
  measurementId: "G-KD1RQL6BWW",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);