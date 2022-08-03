import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'redux/usersSlice';
import websitesReducer from 'redux/websitesSlice';

const appReducer = combineReducers({
  users: usersReducer,
  websites: websitesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
