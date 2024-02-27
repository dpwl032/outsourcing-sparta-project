import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB0u6sTT9x_yX4C6EKWEQcCGuKe3UvPX1I",
  authDomain: "sparta-outsourcing-i3.firebaseapp.com",
  projectId: "sparta-outsourcing-i3",
  storageBucket: "sparta-outsourcing-i3.appspot.com",
  messagingSenderId: "336955638558",
  appId: "1:336955638558:web:83951f8c730bb777b93f0f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
