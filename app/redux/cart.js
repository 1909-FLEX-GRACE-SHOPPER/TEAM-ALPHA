import axios from 'axios';
import thunk from 'redux-thunk';
import { SIGN_OUT, localStorageKey } from './authentication';
import { uuidv4 } from '../utils';

// constants to be moved to a constants.js file
const SET_ORDER_TO_CART = 'SET_ORDER_TO_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EDIT_QUANTITY = 'EDIT_QUANTITY';
const EMPTY_CART = Symbol('EMPTY_CART');
const SET_GUEST_ITEMS = Symbol('SET_GUEST_ITEMS');

// action creators
export const setActiveOrderProducts = items => {
  return {
    type: SET_ORDER_TO_CART,
    items
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

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  };
};

export const guestItemandCost = (items, orderTotal) => {
  return {
    type: SET_GUEST_ITEMS,
    items,
    orderTotal
  };
};

// thunks

export const fetchActiveOrder = activeOrder => {
  return async (dispatch, getState) => {
    if (getState().authentication.isLoggedIn) {
      const order = (await axios.get(`/api/orders/${activeOrder.id}`)).data;
      return dispatch(setActiveOrderProducts(order.orderItems));
    }

    // ignoring local storage for now
    // if (order.orderItems.length)
    //   localStorage.setItem('orderItems', JSON.stringify(order.products));
    // else if (order.orderItems.length === 0)
    //   localStorage.setItem('orderItems', JSON.stringify([]));
  };
};

//Should only POST to cart if the user is a logged in user
//If the guest clicks on checkout and pays then POST items
//Otherwise items should just be in localstorage
export const addNewItemToCart = orderItem => {
  return async (dispatch, getState) => {
    if (getState().authentication.isLoggedIn) {
      const order = getState().orders.activeOrder;
      // console.log(order);
      orderItem.orderId = order.id;
      console.log('orderItem for logged in user from thunk', orderItem);
      const addNewItem = (await axios.post(`/api/orderItems`, orderItem)).data;
      return dispatch(addToCart(addNewItem));
    } else {
      // need to DRY this out later; just keeping seperate for now
      const order = getState().orders.activeOrder;
      orderItem.orderId = order.id;
      orderItem.id = uuidv4();
      // get the product to attach to the cartItem
      const product = (await axios.get(`/api/products/${orderItem.productId}`))
        .data;
      orderItem.product = product;
      console.log('logged our order item: ', orderItem);
      const localStorageItems = JSON.parse(
        localStorage.getItem(localStorageKey)
      );
      console.log('local storage items: ', localStorageItems);
      localStorageItems.push(orderItem);
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageItems));
      return dispatch(addToCart(orderItem));
    }
  };
};

export const postItemsToCartForGuestUser = items => {
  return dispatch => {
    items.forEach(async item => {
      const postedItem = (await axios.post(`api/orderItems`, item)).data;
      console.log('a posted item: ', postedItem);
    });

    localStorage.removeItem(localStorageKey);

    return dispatch(emptyCart());
  };
};

export const removeItem = orderItem => {
  return async (dispatch, getState) => {
    if (getState().authentication.isLoggedIn) {
      await axios.delete(`/api/orderItems/${orderItem.id}`);
      return dispatch(removeFromCart(orderItem));
    }
    //Will need to do this part to remove order items from localStorage
    // else {
    //   const localStorageItems = JSON.parse(localStorage.getItem('orderItems'));
    //   localStorageItems.push(orderItem);
    //   localStorage.setItem('orderItems', JSON.stringify(localStorageItems));
    // }
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

export const setGuestItemsToCart = (items, totalCost) => {
  return dispatch => {
    return dispatch(guestItemandCost(items, totalCost));
  };
};

// Not sure when this was added but it seems to be somones typescript?
//need to complete
// function addToCartLogic(someItem, cart) {
//   let itemExists = false;
//   const { items, orderTotal } = cart;
//   const newItems = items.map(item => {
//     const itemCopy = { ...item };
//     if (itemCopy.id === someItem.id) {
//       itemExists = true;
//       itemCopy.qty += someItem.qty;
//     }
//     return itemCopy;
//   });
//   if (!itemExists) {
//     newItems.push(someItem);
//   }
//   // increase order total

//   return { items: newItems, orderTotal };
// }

// Would an array with items being objects be better organization for cart?
const initialState = {
  items: [],
  //Adding the order total in the state so we can pass this back to the database
  orderTotal: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_TO_CART:
      return {
        ...state,
        //Grabbing all prodcuts from active cart
        items: action.items
      };

    //I dont think we actually need this (maybe we do?). Currently with the way the add to cart button works on the product page, it will POST a fixed object with the items price, productID, and active orderID into the the cart. Though this will pass the active orderID and the productId we dont actually get any assocaition to the productListings b/c this is a manual addition of an object with this reducer. Therefore I wont cant get the product info into the cart page. This is why I needed to add the fetchActiveOrder thunk into the add to cart button on the product page to fetch the updated activeorder. Also, orderTotal would not be needed here because once we log out and log back in the intialState will set it back to $0.
    case ADD_TO_CART:
      return {
        ...state,
        // Check comment above ^^^
        // I needed to uncomment the below out in order to make the cart
        // update when a user is logged out
        items: [...state.items, action.orderItem],
        orderTotal: state.orderTotal + action.orderItem.unitPrice
      };

    // DONT NEED THIS ANYMORE EITHER SINCE WE WONT BE KEEP QUANTITY. BUT LEAVING IT HERE JUST INCASE.
    // case EDIT_QUANTITY:
    //   return {
    //     ...state,
    //     items: state.items.map(orderItem => {
    //       if (orderItem.id === action.orderItem.id) {
    //         return action.orderItem;
    //       }
    //       return action.orderItem;
    //     }),
    //     orderTotal: state.orderTotal.reduce((total, item) => total + item.price)
    //   };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          orderItem => orderItem.id !== action.orderItem.id
        )
      };
    case EMPTY_CART:
      return {
        items: [],
        orderTotal: 0
      };
    case SIGN_OUT:
      return {
        items: [],
        orderTotal: 0
      };
    case SET_GUEST_ITEMS:
      return {
        items: action.items,
        orderTotal: action.orderTotal
      };
    default:
      return state;
  }
};

export default cartReducer;
