import axios from 'axios';
import thunk from 'redux-thunk';

// constants to be moved to a constants.js file
const SET_ORDERS = Symbol('set_orders');
const SET_ACTIVE_ORDER = Symbol('set_active_order');
const ADD_ORDER = Symbol('add_order');
const EDIT_ORDER = Symbol('edit_order');

// action creators

export const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  };
};

export const setActiveOrder = order => {
  return {
    type: SET_ACTIVE_ORDER,
    order
  };
};

export const newOrder = order => {
  return {
    type: ADD_ORDER,
    order
  };
};

export const editOrder = order => {
  return {
    type: EDIT_ORDER,
    order
  };
};

// thunks

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    if (getState().authentication.isLoggedIn) {
      const user = getState().activeUser;
      const { id } = user;
      const orders = (await axios.get(`/api/users/${id}`)).data.orders;
      const activeOrder = orders.find(order => order.status === 'open');
      if (activeOrder) dispatch(setActiveOrder(activeOrder));
      else {
        const newOrder = {
          totalCost: 0.0,
          userId: id,
          status: 'open'
        };
        const postedOrder = (await axios.post('/api/orders', newOrder)).data;
        dispatch(setActiveOrder(postedOrder));
      }
      return dispatch(setOrders(orders));
    }
  };
};

// would use this when a user makes an account for the first time with items in their cart
export const createOrder = order => {
  return async dispatch => {
    const postedOrder = (await axios.post('/api/orders', order)).data;
    return dispatch(newOrder(postedOrder));
  };
};

export const updateOrder = (edits, order) => {
  return async dispatch => {
    const editedOrder = (await axios.put(`/api/orders/${order.id}`, edits))
      .data;
    return dispatch(editOrder(editedOrder));
  };
};

const initialState = {
  orderHistory: [],
  activeOrder: {}
};

const ordersReducer = (state = initialState, action) => {
  const orderHistory = action.orders;
  const activeOrder = action.order;
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orderHistory
      };
    case SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder
      };
    case ADD_ORDER:
      return {
        ...state,
        activeOrder
      };
    case EDIT_ORDER:
      return {
        ...state,
        activeOrder
      };
    default:
      return state;
  }
};

export default ordersReducer;
