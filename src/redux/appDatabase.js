import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
import 'firebase/compat/analytics';

firebase.initializeApp({
  apiKey: 'AIzaSyDPmdrdhIhUBmaar-42pgjlorzpSwucm6Y',
  authDomain: 'modularpage-db.firebaseapp.com',
  projectId: 'modularpage-db',
  storageBucket: 'modularpage-db.appspot.com',
  messagingSenderId: '44283863791',
  appId: '1:44283863791:web:7e7b8bc3bbf624fbf6f11a',
  measurementId: 'G-FZFHBV2S54',
});

firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });
firebase.functions().useEmulator('localhost', 5001);
//firebase.functions();
firebase.analytics();

export default firebase;
