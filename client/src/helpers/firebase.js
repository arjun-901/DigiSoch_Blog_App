import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEvn('VITE_FIREBASE_API'),
  authDomain: "digisoch-blog.firebaseapp.com",
  projectId: "digisoch-blog",
  storageBucket: "digisoch-blog.firebasestorage.app",
  messagingSenderId: "140660941569",
  appId: "1:140660941569:web:ef5fb12ca989a11c8f3100"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }