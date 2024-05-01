// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE6xy1bLi8xjAawd-If81aOq112ug9WbY",
  authDomain: "netflixgpt-openai-00.firebaseapp.com",
  projectId: "netflixgpt-openai-00",
  storageBucket: "netflixgpt-openai-00.appspot.com",
  messagingSenderId: "345933234015",
  appId: "1:345933234015:web:0d56bea0e3e4e6004300ea",
  measurementId: "G-LZXBHPRD72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
