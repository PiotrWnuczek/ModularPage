import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyDPmdrdhIhUBmaar-42pgjlorzpSwucm6Y',
  authDomain: 'modularpage-db.firebaseapp.com',
  projectId: 'modularpage-db',
  storageBucket: 'modularpage-db.appspot.com',
  messagingSenderId: '44283863791',
  appId: '1:44283863791:web:7e7b8bc3bbf624fbf6f11a',
  measurementId: 'G-FZFHBV2S54',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });

export default firebase;
