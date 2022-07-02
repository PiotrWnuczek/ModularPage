import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyBPLnHJ6JtV_jQz2z6HTdiWIXx54h9ystc',
  authDomain: 'websitecreator-db.firebaseapp.com',
  projectId: 'websitecreator-db',
  storageBucket: 'websitecreator-db.appspot.com',
  messagingSenderId: '282092313429',
  appId: '1:282092313429:web:fad03d6ef2cfa29f57addc',
  measurementId: 'G-RLTEP2X7YC',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
