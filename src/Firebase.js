// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// import API from "./secret";

// import { getAnalytics } from "firebase/analytics"im;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgtvu-D-gTahGMH0Y73ScGRdDTziwf4Vo",// bad me env kr dengy inko
  authDomain: "hackathon-225e3.firebaseapp.com",
  projectId: "hackathon-225e3",
  storageBucket: "hackathon-225e3.appspot.com",
  messagingSenderId: "243142968866",
  appId: "1:243142968866:web:29810f59d1d308dec3ec7b",
  measurementId: "G-RBJF6G027V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth=getAuth(app);
const Provider=new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const db=getFirestore(app);
export {Auth,Provider,db};
