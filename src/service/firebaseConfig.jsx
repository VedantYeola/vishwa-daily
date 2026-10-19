// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Sl-9zX_MvIQ5Le2PVJ9HRzLvnCQGF_I",
  authDomain: "ai-travel-planner-c1af6.firebaseapp.com",
  projectId: "ai-travel-planner-c1af6",
  storageBucket: "ai-travel-planner-c1af6.firebasestorage.app",
  messagingSenderId: "336551401246",
  appId: "1:336551401246:web:356773a8f5180dbc789b0f",
  measurementId: "G-FMNWCHSER7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);