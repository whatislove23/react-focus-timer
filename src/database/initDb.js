import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAU0U6L5rEfNOrdNHqLWWOaVcvsJys5SB0",
  authDomain: "my-pomidoro-db.firebaseapp.com",
  projectId: "my-pomidoro-db",
  storageBucket: "my-pomidoro-db.appspot.com",
  messagingSenderId: "187284128746",
  appId: "1:187284128746:web:2a9d808585cbd4b5646893",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
