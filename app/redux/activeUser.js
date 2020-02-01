import axios from 'axios';
import thunk from 'redux-thunk';
import { SIGN_IN } from './authentication';

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

export const modifyUser = edits => {
  return async (dispatch, getState) => {
    const user = getState().activeUser;
    let editedUser = {};
    if (getState().authentication.isLoggedIn) {
      editedUser = (await axios.put(`/api/users/${user.id}`, edits)).data;
    } else {
      editedUser = {
        ...user,
        ...edits
      };
      console.log('edited guest user in Modify User thunk:', editedUser);
    }

    return dispatch(editActiveUser(editedUser));
  };
};

const activeUserReducer = (state = initialState, action) => {
  const activeUser = action.activeUser;
  const editedUser = action.editedUser;
  switch (action.type) {
    case SIGN_IN:
      return activeUser;
    case EDIT_USER:
      return editedUser;
    default:
      return state;
  }
};

export default activeUserReducer;
