import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtendmKKrU8am76hpD3sPuWbxcoYImZNI",
  authDomain: "zanechat-32cb4.firebaseapp.com",
  projectId: "zanechat-32cb4",
  storageBucket: "zanechat-32cb4.appspot.com",
  messagingSenderId: "961097199266",
  appId: "1:961097199266:web:64138a75abcdf1ceabb1fb",
  measurementId: "G-0010FVQFQC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };