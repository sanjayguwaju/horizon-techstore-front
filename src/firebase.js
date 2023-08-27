// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
export { auth, googleAuthProvider };