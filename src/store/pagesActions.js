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

export const createModule = (data, page) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const modules = getState().firestore.data[page].modules;
  const ref = firestore.collection('pages');
  ref.doc(page).update({
    modules: [...modules, { ...data }],
  }).then(() => {
    dispatch({ type: 'CREATEMODULE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATEMODULE_ERROR', err });
  })
};

export const updateModule = (data, id, page) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const modules = getState().firestore.data[page].modules;
  const ref = firestore.collection('pages');
  ref.doc(page).update({
    modules: modules.map(module => module.id === id ? { ...module, ...data } : module),
  }).then(() => {
    dispatch({ type: 'UPDATEMODULE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEMODULE_ERROR', err });
  })
};

export const removeModule = (id, page) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const modules = getState().firestore.data[page].modules;
  const ref = firestore.collection('pages');
  ref.doc(page).update({
    modules: modules.filter(module => module.id !== id),
  }).then(() => {
    dispatch({ type: 'REMOVEMODULE_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEMODULE_ERROR', err });
  })
};
