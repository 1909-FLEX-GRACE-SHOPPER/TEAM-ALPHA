import axios from 'axios';
import thunk from 'redux-thunk';

// constants to be moved to a constants.js file
const SET_ORDERS = 'SET_ORDERS';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EDIT_QUANTITY = 'EDIT_QUANTITY';

// action creators
export const setActiveOrderProducts = orders => {
  return {
    type: SET_ORDERS,
    orders
  };
};

//NOTE: orderItem here should be an object with the product, quantity, and price
export const addToCart = orderItem => {
  return {
    type: ADD_TO_CART,
    orderItem
  };
};

export const removeFromCart = orderItem => {
  return {
    type: REMOVE_FROM_CART,
    orderItem
  };
};

//NOTE: orderItem here should be an object with the product, quantity, and price
export const editQuantity = orderItem => {
  return {
    type: EDIT_QUANTITY,
    orderItem
  };
};

// thunks

export const fetchOrders = activeOrder => {
  return async dispatch => {
    const order = (await axios.get(`/api/orders/${activeOrder.id}`)).data;
    return dispatch(setActiveOrderProducts(order));
  };
};

export const removeItem = orderItem => {
  return async dispatch => {
    await axios.delete(`/api/orderItems/${orderItem.id}`);
    return dispatch(removeFromCart(orderItem));
  };
};

export const updateQuantity = (edits, orderItem) => {
  return async dispatch => {
    const editedItem = (
      await axios.put(`/api/orderItems/${orderItem.id}`, edits)
    ).data;
    return dispatch(editQuantity(editedItem));
  };
};

const initialState = {
  items: [],
  //Adding the order total in the state so we can pass this back to the database
  orderTotal: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        //Grabbing all prodcuts from active cart
        items: action.orders.products
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.orderItem],
        orderTotal: state.orderTotal + action.orderItem.price

        // Will need to use the commented out formula for the rest of reducer if we are not going to calculate price before we add product to the items array
        // (action.orderItem.price * action.orderItem.quanitity)
      };
    //Note: decided to make an "all in one" reducer for incrementing / decrementing rather than seperating them out. Let me know if you prefer to have it seperated?
    case EDIT_QUANTITY:
      return {
        ...state,
        items: state.items.map(orderItem => {
          if (orderItem.id === action.orderItem.id) {
            return action.orderItem;
          }
          return action.orderItem;
        }),
        orderTotal: state.orderTotal.reduce((total, item) => total + item.price)
      };
    case REMOVE_FROM_CART:
      return state.items.filter(
        orderItem => orderItem.id !== action.orderItem.id
      );
    default:
      return state;
  }
};

export default cartReducer;
