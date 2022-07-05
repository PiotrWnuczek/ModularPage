import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import pagesReducer from 'store/pagesReducer';

const appReducer = combineReducers({
  users: usersReducer,
  pages: pagesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
