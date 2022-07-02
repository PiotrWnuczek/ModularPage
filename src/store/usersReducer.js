const initial = {
  error: null,
};

const usersReducer = (state = initial, action) => {
  switch (action.type) {
    case 'SIGNINUSER_SUCCESS':
      console.log('signin success');
      return { ...state, error: null };
    case 'SIGNINUSER_ERROR':
      console.log('signin error');
      return { ...state, error: action.err.message };
    case 'SIGNUPUSER_SUCCESS':
      console.log('signup success');
      return { ...state, error: null };
    case 'SIGNUPUSER_ERROR':
      console.log('signup error');
      return { ...state, error: action.err.message };
    case 'SIGNOUTUSER_SUCCESS':
      console.log('signout success');
      return state;
    case 'UPDATEPROFILE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEPROFILE_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default usersReducer;
