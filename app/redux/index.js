import { combineReducers } from 'redux';
import productsReducer from './products';
import productReducer from './singleProduct';
import usersReducer from './users';
import userReducer from './singleUser';
import cartReducer from './cart';
import authenticationReducer from './authentication';
import activeUserReducer from './activeUser';

const appReduer = combineReducers({
  products: productsReducer,
  product: productReducer,
  users: usersReducer,
  user: userReducer,
  cart: cartReducer,
  authentication: authenticationReducer,
  activeUser: activeUserReducer
});

export default appReduer;
