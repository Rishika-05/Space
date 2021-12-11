import * as firebase from 'firebase/app';

const firebaseConfig = {
   apiKey: "AIzaSyDYeQ_DxTH3mVwpDz7y6z5LR738aOMAkvk",
   authDomain: "webrtc-e6ab7.firebaseapp.com",
   databaseURL: "https://webrtc-e6ab7-default-rtdb.firebaseio.com",
   projectId: "webrtc-e6ab7",
   storageBucket: "webrtc-e6ab7.appspot.com",
   messagingSenderId: "617573279497",
   appId: "1:617573279497:web:426b979285b28ee07515d8",
   measurementId: "${config.measurementId}"
};

firebase.initializeApp(firebaseConfig);


export default firebase;