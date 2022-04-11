import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsvE1KEOuPgimf-F6yo61K6AxFoobwxOo",
  authDomain: "house-marketplace-app-667b7.firebaseapp.com",
  projectId: "house-marketplace-app-667b7",
  storageBucket: "house-marketplace-app-667b7.appspot.com",
  messagingSenderId: "843213703811",
  appId: "1:843213703811:web:a344d76bebe2abb3cfe9b6"
};

// Initialize Firebase
// const app = 
initializeApp(firebaseConfig);
export const db = getFirestore();