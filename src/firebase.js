// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDmMgfeYY1AsN6yvt7KW-jfS52iYvcKQhA",
  authDomain: "examjam-firebase.firebaseapp.com",
  databaseURL: "https://examjam-firebase-default-rtdb.firebaseio.com",
  projectId: "examjam-firebase",
  storageBucket: "examjam-firebase.appspot.com",
  messagingSenderId: "353075002536",
  appId: "1:353075002536:web:45b6bf30937e6084e7969d",
  measurementId: "G-1E1FKRVNHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);