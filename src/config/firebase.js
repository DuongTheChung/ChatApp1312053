
import firebase from 'firebase';
import 'firebase/auth/dist/index.cjs';
import 'firebase/database/dist/index.cjs';
import 'firebase/storage/dist/index.cjs';
 
var config = {
    apiKey: "AIzaSyA_Hi4eopZeOR0i29A0tgz58cGwnG6E7p8",
    authDomain: "test-4e5bd.firebaseapp.com",
    databaseURL: "https://test-4e5bd.firebaseio.com",
    projectId: "test-4e5bd",
    storageBucket: "test-4e5bd.appspot.com",
    messagingSenderId: "1028848693551"
  };

firebase.initializeApp(config)

export default firebase;