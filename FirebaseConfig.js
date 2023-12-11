// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAae5Z1GjqiRHr8at_2CykBUOxzrECKx-w",
  authDomain: "rickandmorty-1.firebaseapp.com",
  databaseURL: "https://rickandmorty-1-default-rtdb.firebaseio.com",
  projectId: "rickandmorty-1",
  storageBucket: "rickandmorty-1.appspot.com",
  messagingSenderId: "701322917137",
  appId: "1:701322917137:web:6284c31c3c1527e3e7c8b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export{db};