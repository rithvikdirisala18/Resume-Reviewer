import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFr-cxBp78ph_aOMp2ESiXk29e-jTXovo",
    authDomain: "ai-resume-checker-e07bf.firebaseapp.com",
    projectId: "ai-resume-checker-e07bf",
    storageBucket: "ai-resume-checker-e07bf.firebasestorage.app",
    messagingSenderId: "518774588442",
    appId: "1:518774588442:web:dfbc97f241d0702dc8bda3",
    measurementId: "G-J4LMH5QH7T"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile };
