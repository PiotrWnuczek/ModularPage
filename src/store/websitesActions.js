export const createWebsite = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const email = getState().firebase.auth.email;
  const ref = firestore.collection('websites');
  ref.doc(data.name).get().then((doc) => {
    doc.exists && dispatch({ type: 'CREATEWEBSITE_CANCEL' });
    !doc.exists && ref.doc(data.name).set({
      ...data, email, sections: [],
    }).then(() => {
      dispatch({ type: 'CREATEWEBSITE_SUCCESS', data });
    }).catch((err) => {
      dispatch({ type: 'CREATEWEBSITE_ERROR', err });
    })
  })
};

export const updateWebsite = (data, wid) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('websites');
  ref.doc(wid).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEWEBSITE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEWEBSITE_ERROR', err });
  })
};

export const removeWebsite = (wid) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('websites');
  ref.doc(wid).delete().then(() => {
    dispatch({ type: 'REMOVEWEBSITE_SUCCESS', wid });
  }).catch((err) => {
    dispatch({ type: 'REMOVEWEBSITE_SUCCESS', err });
  })
};

export const createSection = (data, wid) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const sections = getState().firestore.data[wid].sections;
  const ref = firestore.collection('websites');
  ref.doc(wid).update({
    sections: [...sections, { ...data }],
  }).then(() => {
    dispatch({ type: 'CREATESECTION_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATESECTION_ERROR', err });
  })
};

export const updateSection = (data, sid, wid) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const sections = getState().firestore.data[wid].sections;
  const ref = firestore.collection('websites');
  ref.doc(wid).update({
    sections: sections.map(section => section.id === sid ? { ...section, ...data } : section),
  }).then(() => {
    dispatch({ type: 'UPDATESECTION_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATESECTION_ERROR', err });
  })
};

export const removeSection = (sid, wid) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const sections = getState().firestore.data[wid].sections;
  const ref = firestore.collection('websites');
  ref.doc(wid).update({
    sections: sections.filter(section => section.id !== sid),
  }).then(() => {
    dispatch({ type: 'REMOVESECTION_SUCCESS', sid });
  }).catch((err) => {
    dispatch({ type: 'REMOVESECTION_ERROR', err });
  })
};
