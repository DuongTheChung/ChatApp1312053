
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
 
var config = {
    apiKey: "AIzaSyChL1K1XqWrE4IraJM3RodkBbuwPfdnQT4",
    authDomain: "chat-app-mini.firebaseapp.com",
    databaseURL: "https://chat-app-mini.firebaseio.com",
    projectId: "chat-app-mini",
    storageBucket: "chat-app-mini.appspot.com",
    messagingSenderId: "781983620261"
  };
firebase.initializeApp(config)

export default firebase;