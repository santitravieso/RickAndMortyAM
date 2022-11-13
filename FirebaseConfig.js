// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqkbHfEpH2V-eeSEVgsmqNdFr8Zb8LUVg",
  authDomain: "rickandmortyam.firebaseapp.com",
  projectId: "rickandmortyam",
  storageBucket: "rickandmortyam.appspot.com",
  messagingSenderId: "1010287067392",
  appId: "1:1010287067392:web:6e87cac095c58b043033e5",
  databaseURL: "https://rickandmortyam-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export{db};