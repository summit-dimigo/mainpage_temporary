// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

//auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
    // Other config options
});

//db 
export const firestore = getFirestore(app);