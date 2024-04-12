// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
