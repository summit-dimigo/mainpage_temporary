import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLJqr7Nbg87CH-bCKp6Kb9UV9wA0zgWPw",
  authDomain: "mypage-627c4.firebaseapp.com",
  projectId: "mypage-627c4",
  storageBucket: "mypage-627c4.firebasestorage.app",
  messagingSenderId: "691238620689",
  appId: "1:691238620689:web:075bde489dac136c8cabb0",
  measurementId: "G-G5HJ343L77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

console.log('🔥 Firebase 인증 및 Firestore 설정 완료');

export { auth, db };
