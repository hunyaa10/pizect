import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0Qt9v5oSj9zW2actMFKqe_UpR8Ad9yag",
  authDomain: "pizect.firebaseapp.com",
  databaseURL:
    "https://pizect-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pizect",
  storageBucket: "pizect.appspot.com",
  messagingSenderId: "486064919975",
  appId: "1:486064919975:web:161161b3ef5581bee79282",
  measurementId: "G-JJSTH0YTV2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
