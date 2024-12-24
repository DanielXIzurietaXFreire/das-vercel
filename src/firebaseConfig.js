// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB6ZEYewhdhDi85Q6SUGyv6qlgr1oByWk",
  authDomain: "app-qr-9620d.firebaseapp.com",
  projectId: "app-qr-9620d",
  storageBucket: "app-qr-9620d.firebasestorage.app",
  messagingSenderId: "654702828779",
  appId: "1:654702828779:web:46d56279379888ea9a72ae",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
