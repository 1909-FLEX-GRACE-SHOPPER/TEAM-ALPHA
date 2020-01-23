import axios from 'axios';
import thunk from 'redux-thunk';

// constants to be moved to a constants.js file
const SET_ORDERS = Symbol('set_orders');
const ADD_ORDER = Symbol('add_order');
const EDIT_ORDER = Symbol('edit_order');

// action creators

export const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
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
  return async dispatch => {
    const orders = (await axios.get('/api/orders')).data;
    return dispatch(setOrders(orders));
  };
};

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

const initialState = [];

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.order];
    case EDIT_ORDER:
      return state.map(order => {
        if (order.id === action.order.id) return action.order;
        return order;
      });
    default:
      return state;
  }
};

export default ordersReducer;
