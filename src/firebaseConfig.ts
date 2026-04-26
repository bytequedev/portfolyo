// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6_5Zg3A_-niGtAYGSPKhkQlABg01ZDjM",
  authDomain: "portfolyo-259f9.firebaseapp.com",
  projectId: "portfolyo-259f9",
  storageBucket: "portfolyo-259f9.appspot.com",
  messagingSenderId: "484107017517",
  appId: "1:484107017517:web:eecf51b40908bb36d107a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };