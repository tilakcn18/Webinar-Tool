import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALYAcmDV1I9_liBLU7LL8bfDE71k90BJ4",
    authDomain: "webinar-project-id.firebaseapp.com",
    projectId: "webinar-project-id",
    storageBucket: "webinar-project-id.appspot.com",
    messagingSenderId: "173949549982",
    appId: "1:173949549982:web:cbacad5e89398475cbaa8f",
    measurementId: "G-1V26XNF9VR"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};