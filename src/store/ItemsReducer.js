const initial = {
  id: null,
};

const itemsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEITEM_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEITEM_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEITEM_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEITEM_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEITEM_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEITEM_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default itemsReducer;
