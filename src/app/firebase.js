import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCytNKtpZ1ZOYUVUYf4MHq1KWQnfDvH67w",
  authDomain: "value-of-the-day-32197.firebaseapp.com",
  projectId: "value-of-the-day-32197",
  storageBucket: "value-of-the-day-32197.firebasestorage.app",
  messagingSenderId: "720344063109",
  appId: "1:720344063109:web:8345afa62b070e488b1dec",
  measurementId: "G-EQKCTNVKC9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

