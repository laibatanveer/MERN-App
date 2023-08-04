// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDICT7srMK2YRvD2zcnQ4L9z8LQjhILQ4I",
  authDomain: "makeup-api-storage.firebaseapp.com",
  projectId: "makeup-api-storage",
  storageBucket: "makeup-api-storage.appspot.com",
  messagingSenderId: "678472033234",
  appId: "1:678472033234:web:81a6582696053652419e0b",
  measurementId: "G-FQE7L50NNG"
};


const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)