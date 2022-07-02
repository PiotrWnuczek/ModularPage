const initial = {
  id: null,
};

const websitesReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEWEBSITE_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEWEBSITE_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEWEBSITE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEWEBSITE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEWEBSITE_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEWEBSITE_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default websitesReducer;
