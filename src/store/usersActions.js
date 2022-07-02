export const signinUser = (creds) => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(
    creds.email, creds.password,
  ).then(() => {
    dispatch({ type: 'SIGNINUSER_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNINUSER_ERROR', err });
  })
};

export const signupUser = (user) => (dispatch, gs, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  firebase.auth().createUserWithEmailAndPassword(
    user.email, user.password,
  ).then((resp) => (
    firestore.collection('users').doc(resp.user.uid).set({
      email: user.email, firstname: user.firstname, lastname: user.lastname,
      tags: [user.firstname + ' ' + user.lastname],
    })
  )).then(() => {
    dispatch({ type: 'SIGNUPUSER_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNUPUSER_ERROR', err });
  })
};

export const signoutUser = () => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signOut().then(() => {
    dispatch({ type: 'SIGNOUTUSER_SUCCESS' });
  })
};

export const updateProfile = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('users').doc(id);
  ref.update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEPROFILE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEPROFILE_ERROR', err });
  })
};
