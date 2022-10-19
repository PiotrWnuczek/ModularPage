import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signinUser = createAsyncThunk(
  'signinUser', async (values, thunk) => {
    const firebase = thunk.extra.getFirebase();
    try {
      return await firebase.auth().signInWithEmailAndPassword(
        values.email, values.password,
      ).then(() => values.email);
    } catch (error) { throw error }
  },
);

export const signupUser = createAsyncThunk(
  'signupUser', async (values, thunk) => {
    const firebase = thunk.extra.getFirebase();
    const firestore = thunk.extra.getFirestore();
    try {
      return await firebase.auth().createUserWithEmailAndPassword(
        values.email, values.password,
      ).then((resp) => (
        firestore.collection('users').doc(resp.user.uid).set({
          email: values.email,
          date: new Date(),
          premium: new Date(2023, 0, 0),
          limit: { all: 3, custom: 1 },
        })
      )).then(() => values.email);
    } catch (error) { throw error }
  },
);

export const updateProfile = createAsyncThunk(
  'updateProfile', async ({ values, id }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const ref = firestore.collection('users').doc(id);
    try {
      return await ref.update({
        ...values,
      }).then(() => values);
    } catch (error) { throw error }
  },
);

export const signoutUser = createAsyncThunk(
  'signoutUser', async (d, thunk) => {
    const firebase = thunk.extra.getFirebase();
    try {
      return await firebase.auth().signOut();
    } catch (error) { throw error }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { error: null },
  extraReducers: {
    [signinUser.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return { ...state, error: null };
    },
    [signinUser.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return { ...state, error: action.error.message };
    },
    [signupUser.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return { ...state, error: null };
    },
    [signupUser.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return { ...state, error: action.error.message };
    },
    [updateProfile.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [updateProfile.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [signoutUser.fulfilled]: (state, action) => {
      //console.log(action.type);
      return state;
    },
    [signoutUser.rejected]: (state, action) => {
      //console.log(action.type);
      return state;
    },
  },
});

export default usersSlice.reducer;
