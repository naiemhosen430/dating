import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9hixFRETX6wlshBUB9PWbHmlU4LgGR_U",
  authDomain: "zane-3723d.firebaseapp.com",
  databaseURL: "https://zane-3723d-default-rtdb.firebaseio.com",
  projectId: "zane-3723d",
  storageBucket: "zane-3723d.appspot.com",
  messagingSenderId: "1006487651032",
  appId: "1:1006487651032:web:a4395adbf0d8fa2784cdad",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
