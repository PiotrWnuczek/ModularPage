export const createItem = (data) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('items');
  ref.add({
    ...data
  }).then(() => {
    dispatch({ type: 'CREATEITEM_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATEITEM_ERROR', err });
  })
};

export const updateItem = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('items');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEITEM_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEITEM_ERROR', err });
  })
};

export const removeItem = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('items');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVEITEM_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEITEM_SUCCESS', err });
  })
};
