import { combineReducers } from 'redux';
import productsReducer from './products';
import productReducer from './singleProduct';
import usersReducer from './users';
import userReducer from './singleUser';
import cartReducer from './cart';
import authenticationReducer from './authentication';
import ordersReducer from './orders';
import activeUserReducer from './activeUser';
import productListingReducer from './productListing';

const appReduer = combineReducers({
  products: productsReducer,
  product: productReducer,
  users: usersReducer,
  user: userReducer,
  cart: cartReducer,
  authentication: authenticationReducer,
  orders: ordersReducer,
  activeUser: activeUserReducer,
  productListing: productListingReducer
});

export default appReduer;
