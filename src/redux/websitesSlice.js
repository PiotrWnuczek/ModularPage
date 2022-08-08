import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createWebsite = createAsyncThunk(
  'createWebsite', async ({ values, navigate }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const email = thunk.getState().firebase.auth.email;
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(values.name).get().then((doc) => {
        !doc.exists && ref.doc(values.name).set({
          ...values, email, sections: [], public: false,
        }).then(() => navigate && navigate('/board'));
      }).then(() => values);
    } catch (error) { throw error }
  },
);

export const updateWebsite = createAsyncThunk(
  'updateWebsite', async ({ values, wid, navigate }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(wid).update({
        ...values,
      }).then(
        () => navigate && navigate('/board'),
      ).then(() => values);
    } catch (error) { throw error }
  },
);

export const removeWebsite = createAsyncThunk(
  'removeWebsite', async ({ wid, navigate }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(wid).delete().then(
        () => navigate && navigate('/board'),
      ).then(() => wid);
    } catch (error) { throw error }
  },
);

export const createSection = createAsyncThunk(
  'createSection', async ({ values, index, wid }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const sections = thunk.getState().firestore.data[wid].sections;
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(wid).update({
        sections: [
          ...sections.slice(0, index),
          { ...values },
          ...sections.slice(index),
        ],
      }).then(() => values);
    } catch (error) { throw error }
  },
);

export const updateSection = createAsyncThunk(
  'updateSection', async ({ values, file, sid, wid }, thunk) => {
    const firebase = thunk.extra.getFirebase();
    const firestore = thunk.extra.getFirestore();
    const sections = thunk.getState().firestore.data[wid].sections;
    const storage = firebase.storage().ref(wid).child(sid);
    const ref = firestore.collection('websites');
    try {
      return await (
        file ? storage.put(file).then(() => storage.getDownloadURL().then((url) => (
          ref.doc(wid).update({
            sections: sections.map(
              section => section.id === sid ? { ...section, url } : section
            ),
          }).then(() => file)
        ))) : ref.doc(wid).update({
          sections: sections.map(
            section => section.id === sid ? { ...section, ...values } : section
          ),
        }).then(() => values)
      );
    } catch (error) { throw error }
  },
);

export const removeSection = createAsyncThunk(
  'removeSection', async ({ sid, wid }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const sections = thunk.getState().firestore.data[wid].sections;
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(wid).update({
        sections: sections.filter(section => section.id !== sid),
      }).then(() => sid);
    } catch (error) { throw error }
  },
);

const websitesSlice = createSlice({
  name: 'websites', initialState: { error: null },
  extraReducers: {
    [createWebsite.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return { ...state, error: null };
    },
    [createWebsite.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return { ...state, error: 'Website exist' };
    },
    [updateWebsite.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return state;
    },
    [updateWebsite.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return state;
    },
    [removeWebsite.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return state;
    },
    [removeWebsite.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return state;
    },
    [createSection.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return state;
    },
    [createSection.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return state;
    },
    [updateSection.pending]: (state, action) => {
      console.log(action.type, action.payload);
      return { ...state, loading: true };
    },
    [updateSection.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return { ...state, loading: false };
    },
    [updateSection.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return { ...state, loading: false };
    },
    [removeSection.fulfilled]: (state, action) => {
      console.log(action.type, action.payload);
      return state;
    },
    [removeSection.rejected]: (state, action) => {
      console.log(action.type, action.error);
      return state;
    },
  },
});

export default websitesSlice.reducer;
