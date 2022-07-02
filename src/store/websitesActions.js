export const createWebsite = (data) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('websites');
  ref.add({
    ...data
  }).then(() => {
    dispatch({ type: 'CREATEWEBSITE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATEWEBSITE_ERROR', err });
  })
};

export const updateWebsite = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('websites');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEWEBSITE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEWEBSITE_ERROR', err });
  })
};

export const removeWebsite = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('websites');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVEWEBSITE_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEWEBSITE_SUCCESS', err });
  })
};
