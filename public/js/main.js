// Firebase Deployment
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVi6loRRJgyBOFnoOvuTDCasJVAQYNyNk",
  authDomain: "smux-connect.firebaseapp.com",
  projectId: "smux-connect",
  storageBucket: "smux-connect.appspot.com",
  messagingSenderId: "263101840412",
  appId: "1:263101840412:web:e9bf8129480b278b23b3d9",
  measurementId: "G-G1V5MW7KQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);