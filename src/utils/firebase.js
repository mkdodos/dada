import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "social-cool-f16ba.firebaseapp.com",
    projectId: "social-cool-f16ba",
    storageBucket: "social-cool-f16ba.appspot.com",
    messagingSenderId: "578558980743",
    appId: "1:578558980743:web:4668ba80e8df3c24087e22"
  };

 const app = firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

 const auth = app.auth()

  export default firebase
  export {db,auth}