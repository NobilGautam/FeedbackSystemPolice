import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "hackathon-225e3.firebaseapp.com",
  projectId: "hackathon-225e3",
  storageBucket: "hackathon-225e3.appspot.com",
  messagingSenderId: "243142968866",
  appId: "1:243142968866:web:29810f59d1d308dec3ec7b",
  measurementId: "G-RBJF6G027V"
};

const app = initializeApp(firebaseConfig);
const Auth=getAuth(app);
const Provider=new GoogleAuthProvider();
const db=getFirestore(app);
export {Auth,Provider,db};
