import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyARehWpHCzDtXBdDxrMwimmLzh9jyxQpKY",
    authDomain: "officers-chat-9a8ec.firebaseapp.com",
    projectId: "officers-chat-9a8ec",
    storageBucket: "officers-chat-9a8ec.appspot.com",
    messagingSenderId: "127568810113",
    appId: "1:127568810113:web:90980c89226f3ded7dbd80",
    measurementId: "G-RV5292QLG0"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;