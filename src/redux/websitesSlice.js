import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createWebsite = createAsyncThunk(
  'createWebsite', async ({ values, navigate }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const auth = thunk.getState().firebase.auth;
    const ref = firestore.collection('websites');
    try {
      const doc = await ref.doc(values.name).get();
      if (doc.exists) throw new Error('exist');
      if (!doc.exists) return await ref.doc(values.name).set({
        ...values, public: false,
        title: values.name,
        email: auth.email, uid: auth.uid,
      }).then(
        () => navigate && navigate('/board')
      ).then(() => values);
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
    const firebase = thunk.extra.getFirebase();
    const firestore = thunk.extra.getFirestore();
    const ref = firestore.collection('websites');
    const storage = firebase.storage().ref(wid);
    try {
      await storage.listAll().then(
        dir => dir.items.forEach(item => item.delete()),
      );
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
          { ...values, id: Math.random().toString(16).slice(2) },
          ...sections.slice(index),
        ],
      }).then(() => values);
    } catch (error) { throw error }
  },
);

export const updateSection = createAsyncThunk(
  'updateSection', async ({ values, sid, wid }, thunk) => {
    const firestore = thunk.extra.getFirestore();
    const sections = thunk.getState().firestore.data[wid].sections;
    const ref = firestore.collection('websites');
    try {
      return await ref.doc(wid).update({
        sections: sections.map(
          section => section.id === sid ? { ...section, ...values } : section
        ),
      }).then(() => values);
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

export const createFile = createAsyncThunk(
  'createFile', async ({ file, sid, wid }, thunk) => {
    const firebase = thunk.extra.getFirebase();
    const firestore = thunk.extra.getFirestore();
    const sections = thunk.getState().firestore.data[wid].sections;
    const storage = firebase.storage().ref(wid).child(sid);
    const ref = firestore.collection('websites');
    try {
      const url = await storage.put(file).then(() => storage.getDownloadURL());
      if (sid === 'favicon') return await ref.doc(wid).update({
        favicon: url,
      }).then(() => file);
      if (sid === 'logo') return await ref.doc(wid).update({
        logo: url,
      }).then(() => file);
      if (sid !== 'favicon' && sid !== 'logo') return await ref.doc(wid).update({
        sections: sections.map(
          section => section.id === sid ? { ...section, url } : section
        ),
      }).then(() => file);
    } catch (error) { throw error }
  },
);

export const removeFile = createAsyncThunk(
  'removeFile', async ({ sid, wid }, thunk) => {
    const firebase = thunk.extra.getFirebase();
    const storage = firebase.storage().ref(wid).child(sid);
    try { return await storage.delete().then(() => sid) }
    catch (error) { throw error }
  },
);

const websitesSlice = createSlice({
  name: 'websites', initialState: { error: null },
  extraReducers: {
    [createWebsite.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return { ...state, error: null };
    },
    [createWebsite.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return { ...state, error: true };
    },
    [updateWebsite.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [updateWebsite.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [removeWebsite.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [removeWebsite.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [createSection.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [createSection.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [updateSection.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [updateSection.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [removeSection.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [removeSection.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
    [createFile.pending]: (state, action) => {
      //console.log(action.meta.arg);
      return { ...state, loading: action.meta.arg.sid };
    },
    [createFile.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return { ...state, loading: false };
    },
    [createFile.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return { ...state, loading: false };
    },
    [removeFile.fulfilled]: (state, action) => {
      //console.log(action.type, action.payload);
      return state;
    },
    [removeFile.rejected]: (state, action) => {
      //console.log(action.type, action.error);
      return state;
    },
  },
});

export default websitesSlice.reducer;
