// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";


const firebaseConfig = {
   apiKey: "AIzaSyB6JWijPYGs0pd3Nc2FBnhZ7u-M6cIjeHU",
   authDomain: "space123-d93e1.firebaseapp.com",
   projectId: "space123-d93e1",
   storageBucket: "space123-d93e1.appspot.com",
   messagingSenderId: "227692047106",
   appId: "1:227692047106:web:31fbcb1b5b1b9b74c2701b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
var firebaseOrdersCollection = db.ref('Interview_details');

export default firebaseOrdersCollection;