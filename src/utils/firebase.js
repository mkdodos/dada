import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBKVsNm8RP9VKYBgEwmyRQsitx9dncLuaI",
    authDomain: "social-cool-f16ba.firebaseapp.com",
    projectId: "social-cool-f16ba",
    storageBucket: "social-cool-f16ba.appspot.com",
    messagingSenderId: "578558980743",
    appId: "1:578558980743:web:4668ba80e8df3c24087e22"
  };

 firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

  const col = db.collection('topics').get().then((snapshot)=>{
    const data = snapshot.docs.map(doc=>{
        return doc.data()
    })
    // console.log(data)
  })

  export default firebase
  export {db}