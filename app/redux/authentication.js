import axios from 'axios';
import thunk from 'redux-thunk';

export const SIGN_IN = Symbol('sign in');
export const SIGN_OUT = Symbol('sign out');
export const LOG_IN_ERROR = Symbol('log in error');

// action creators
const signIn = data => {
  return {
    type: SIGN_IN,
    isLoggedIn: true,
    activeUser: data
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT,
    isLoggedIn: false
  };
};

// deal with log in error later

// thunks
export const logInAttempt = logInInfo => {
  return dispatch => {
    axios
      .post('/auth/login', logInInfo)
      .then(res => {
        // console.log('this is the response data', res.data);
        return dispatch(signIn(res.data));
      })
      .catch(e => {
        console.error(e);
        return dispatch(signOut());
      });
  };
};

export const logOutAttempt = () => {
  return dispatch => {
    axios
      .get('/logout')
      .then(() => {
        return dispatch(signOut());
      })
      .catch(e => {
        console.error(e);
        return dispatch(signOut());
      });
  };
};

export const initialLogInAttempt = () => {
  return dispatch => {
    axios
      .get('/auth/me') // fix
      .then(() => {
        return dispatch(signIn());
      })
      .catch(e => {
        console.error(e);
        return dispatch(signOut());
      });
  };
};

const initialState = {
  isLoggedIn: false,
  logInError: false
};

const authenticationReducer = (state = initialState, action) => {
  const isLoggedIn = action.isLoggedIn;
  const logInError = action.logInError;
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        isLoggedIn
      };
    }
    case LOG_IN_ERROR: {
      return {
        ...state,
        logInError
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
