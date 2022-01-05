import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzZzjN298O7uWnQfDEcs51a-DVE9_xVK0",
    authDomain: "mentee-tracking-system.firebaseapp.com",
    projectId: "mentee-tracking-system",
    storageBucket: "mentee-tracking-system.appspot.com",
    messagingSenderId: "665844868857",
    appId: "1:665844868857:web:0da6c75dc7052c115ca428",
    measurementId: "G-0JQGLYWPM2"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export {
    firebaseApp, auth, db,
};

export default firebaseConfig;
