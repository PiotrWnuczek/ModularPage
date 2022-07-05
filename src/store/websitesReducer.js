const initial = {
  info: null,
};

const exist = 'Website with that name already exists';

const websitesReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEWEBSITE_CANCEL':
      console.log(exist);
      return { ...state, info: exist };
    case 'CREATEWEBSITE_SUCCESS':
      console.log(action.data);
      return { ...state, info: null };
    case 'CREATEWEBSITE_ERROR':
      console.log(action.err);
      return { ...state, info: null };
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
    case 'CREATESECTION_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATESECTION_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATESECTION_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATESECTION_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVESECTION_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVESECTION_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default websitesReducer;
