import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { useSelector, Provider } from 'react-redux';
import { getFirebase, isLoaded } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import appReducer from 'store/appReducer';
import appDatabase from 'store/appDatabase';
import thunk from 'redux-thunk';
import App from 'App';
import 'index.css';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration.js';

const store = createStore(
  appReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
);

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

ReactDOM.render(
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Provider store={store}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </Provider>
  </ReactReduxFirebaseProvider>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
