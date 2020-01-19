import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {
  isLoggedIn: false,
  logInError: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authenticationReducer;
