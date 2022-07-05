const initial = {
  id: null,
};

const pagesReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEPAGE_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEPAGE_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEPAGE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEPAGE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEPAGE_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEPAGE_ERROR':
      console.log(action.err);
      return state;
    case 'CREATEMODULE_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEMODULE_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEMODULE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEMODULE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEMODULE_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEMODULE_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default pagesReducer;
