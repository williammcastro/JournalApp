
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFUD7ZaNazbMUPQdwYPxWqQK2IuQ5bmVI",
  authDomain: "real-automotivation.firebaseapp.com",
  databaseURL: "https://real-automotivation-default-rtdb.firebaseio.com",
  projectId: "real-automotivation",
  storageBucket: "real-automotivation.appspot.com",
  messagingSenderId: "801586386155",
  appId: "1:801586386155:web:6e845161377ede2c935aae",
  measurementId: "G-7F230H5HN4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}