import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyClLeHQJMt3BzbrK_AHpWeq0nlqzY2r5ik',
  authDomain: 'money-39797.firebaseapp.com',
  projectId: 'money-39797',
  storageBucket: 'money-39797.appspot.com',
  messagingSenderId: '142963352306',
  appId: '1:142963352306:web:ac3c09e593009a5175666b',
  measurementId: 'G-012VKYDZ07',
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const auth = app.auth();

export default firebase;
export { db, auth };
