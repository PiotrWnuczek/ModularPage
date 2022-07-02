import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: '0',
  authDomain: '0',
  projectId: '0',
  storageBucket: '0',
  messagingSenderId: '0',
  appId: '0',
  measurementId: '0',
  databaseURL: '0',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
