// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCuahiVjKEqQkHpXuN6424zM0MQrFiPt28",
  authDomain: "final-ecomerce.firebaseapp.com",
  projectId: "final-ecomerce",
  storageBucket: "final-ecomerce.appspot.com",
  messagingSenderId: "172395969361",
  appId: "1:172395969361:web:79552562707e2873a7f170",
  measurementId: "G-3N1JE1M7ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)
const analytics = getAnalytics(app);

export {db,auth}