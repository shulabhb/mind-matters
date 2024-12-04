import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7cwN3_pXZsUw-Sso5RlkzXFCa4HNceOc",
  authDomain: "mindmatters-f5cc6.firebaseapp.com",
  projectId: "mindmatters-f5cc6",
  storageBucket: "mindmatters-f5cc6.firebaseapp.com",
  messagingSenderId: "743909873787",
  appId: "1:743909873787:web:5d22cb80d20025261f6ade",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
