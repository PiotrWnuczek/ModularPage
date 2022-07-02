import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import websitesReducer from 'store/websitesReducer';

const appReducer = combineReducers({
  users: usersReducer,
  websites: websitesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
