import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCsz3fyyj2fJ9u1zac-SIEUA6Ydh0wbRQA",
    authDomain: "menteetrackingsystem.firebaseapp.com",
    projectId: "menteetrackingsystem",
    storageBucket: "menteetrackingsystem.appspot.com",
    messagingSenderId: "393053235642",
    appId: "1:393053235642:web:997f5843ac5d6edf82d583",
    measurementId: "G-5ZP5W5PC8E"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export {
    firebaseApp, auth, db, storage
};

export default firebaseConfig;
