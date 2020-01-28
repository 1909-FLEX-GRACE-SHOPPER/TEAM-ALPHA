import axios from 'axios';
import thunk from 'redux-thunk';
import { setActiveOrder, setOrders } from './orders';
import { fetchOrder } from './cart';

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
    isLoggedIn: false,
    orders: [],
    order: {}
  };
};

// deal with log in error later

// thunks
export const logInAttempt = logInInfo => {
  return async (dispatch, getState) => {
    await axios
      .post('/auth/login', logInInfo)
      .then(res => {
        return dispatch(signIn(res.data));
      })
      .catch(e => {
        console.error(e);
        return dispatch(signOut());
      });
    const user = getState().activeUser;
    const orders = (await axios.get(`/api/users/${user.id}`)).data.orders;
    const activeOrder = orders.find(order => order.status === 'open');
    if (activeOrder) {
      dispatch(setActiveOrder(activeOrder));
      dispatch(fetchOrder(activeOrder));
    } else {
      const newOrderForLoggedInUser = {
        totalCost: 0.0,
        userId: user.id,
        status: 'open'
      };
      const postedOrder = (
        await axios.post('/api/orders', newOrderForLoggedInUser)
      ).data;
      dispatch(setActiveOrder(postedOrder));
      dispatch(fetchOrder(postedOrder));
    }
    return dispatch(setOrders(orders));
  };
};

export const logOutAttempt = () => {
  return dispatch => {
    axios
      .get('/auth/signout')
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
      .get('/auth/me')
      .then(res => {
        return dispatch(signIn(res.data));
      })
      .catch(e => {
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
