// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "amit-blog-a0ec4.firebaseapp.com",
  projectId: "amit-blog-a0ec4",
  storageBucket: "amit-blog-a0ec4.appspot.com",
  messagingSenderId: "839699975469",
  appId: "1:839699975469:web:e3583273ceabe9c42957a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);