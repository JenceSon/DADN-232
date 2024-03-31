// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcijFYtrFUctMnTOwxDTL6scXg6AtDVHY",
  authDomain: "dadn-c3709.firebaseapp.com",
  projectId: "dadn-c3709",
  storageBucket: "dadn-c3709.appspot.com",
  messagingSenderId: "490231467952",
  appId: "1:490231467952:web:9edc7696c4916418945075",
  measurementId: "G-R5RS9MNH8T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;