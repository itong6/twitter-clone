// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

export {db}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcSkl2dkQulQ5UsjDInBIcbLlNCsmTRVY",
  authDomain: "twitter-clone-5ba3a.firebaseapp.com",
  projectId: "twitter-clone-5ba3a",
  storageBucket: "twitter-clone-5ba3a.appspot.com",
  messagingSenderId: "891273880344",
  appId: "1:891273880344:web:9d803270581a62f5dbb46d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const firestore = getFirestore(app);

export const auth = getAuth(app);