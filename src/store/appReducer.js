import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import itemsReducer from 'store/usersReducer';

const appReducer = combineReducers({
  users: usersReducer,
  items: itemsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
