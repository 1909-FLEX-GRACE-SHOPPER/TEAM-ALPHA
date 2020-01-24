import axios from 'axios';
import thunk from 'redux-thunk';

const SET_USER = Symbol('set_user');
const EDIT_USER = Symbol('edit_user');

// inital state
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  shippingAddress1: '',
  shippingAddress2: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingState: '',
  billingZip: ''
};

// action creators
const setActiveUser = activeUser => {
  return {
    type: SET_USER,
    activeUser
  };
};

const editActiveUser = editedUser => {
  return {
    type: EDIT_USER,
    editedUser
  };
};

// thunks
// export const initialVist = () => {
//   return dispatch => {
//     // cases
//     // check if user is logged in,

//     // A) if user is logged in
//     // 1) get user from db and set as active user
//     // 2) change authentication to signed in
//     // 3) this should also populate the cart (if there is one)

//     // B) if user is not logged in, but has an existing cookie
//     // 1) get that user from the database and set as active user
//     // 2) this should also populate the cart (if there is one)

//     // C) if user is not logged in and has no cookie
//     // 1) post a user
//     // 2) set active user as initial state
//     // 3) on back end hit them with a cookie

//     axios
//       .get('/whoami')
//       .then(async () => {
//         const user = (await axios.get('/whoami')).data;
//         return dispatch(setActiveUser(user));
//       })
//       .catch(e => {
//         console.error(e);
//       });

//     axios
//       .get('/returninguser')
//       .then(async () => {
//         const user = (await axios.get('/returninguser')).data;
//         // need to set the returninguser route to return the specific user
//         return dispatch(setActiveUser(user));
//       })
//       .catch(async () => {
//         const user = (await axios.post('/api/users', initialState)).data;
//         // make sure we are hitting them with a cookie too
//         return dispatch(setActiveUser(user));
//       });
//   };
// };

export const modifyUser = edits => {
  return async (dispatch, getState) => {
    const user = getState().activeUser;
    const editedUser = (await axios.put(`/api/users/${user.id}`, edits)).data;
    return dispatch(editActiveUser(editedUser));
  };
};

const activeUserReducer = (state = initialState, action) => {
  const activeUser = action.activeUser;
  const editedUser = action.editedUser;
  switch (action.type) {
    case SET_USER:
      return activeUser;
    case EDIT_USER:
      return editedUser;
    default:
      return state;
  }
};

export default activeUserReducer;
