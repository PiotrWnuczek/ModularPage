export const createPage = (data) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('pages');
  ref.doc(data.name).set({
    ...data, modules: [],
  }).then(() => {
    dispatch({ type: 'CREATEPAGE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATEPAGE_ERROR', err });
  })
};

export const updatePage = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('pages');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEPAGE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEPAGE_ERROR', err });
  })
};

export const removePage = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('pages');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVEPAGE_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEPAGE_SUCCESS', err });
  })
};
