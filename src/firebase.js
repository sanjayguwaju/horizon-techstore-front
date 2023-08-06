// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6afkWsKl0kt6xff2wV8D4hkIpMfNxZfg",
  authDomain: "tech-store-99c6d.firebaseapp.com",
  projectId: "tech-store-99c6d",
  storageBucket: "tech-store-99c6d.appspot.com",
  messagingSenderId: "1077530832752",
  appId: "1:1077530832752:web:8603600416337c8194e9b5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();