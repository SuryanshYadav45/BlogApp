import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0BVqpGTvftiOdzp1LBlWvxVWFQR8tIM",
  authDomain: "blogwebsite-e7525.firebaseapp.com",
  projectId: "blogwebsite-e7525",
  storageBucket: "blogwebsite-e7525.appspot.com",
  messagingSenderId: "632704426292",
  appId: "1:632704426292:web:f8f2047cc82396230b8561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(); 