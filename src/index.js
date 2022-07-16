import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, Provider } from 'react-redux';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration.js';
import appReducer from 'store/appReducer';
import appDatabase from 'store/appDatabase';
import App from 'App';
import 'index.css';

const store = configureStore({
  reducer: appReducer,
  middleware: getMiddleware => getMiddleware({
    thunk: { extraArgument: { getFirebase, getFirestore } },
    serializableCheck: false,
  }),
});

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase: appDatabase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  return isLoaded(auth) ? children : <p>loading...</p>;
};

const root = createRoot(document.getElementById('root'));

root.render(
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </Provider>
  </ReactReduxFirebaseProvider>
);

serviceWorkerRegistration.register();
