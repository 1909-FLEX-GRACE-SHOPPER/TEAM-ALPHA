import axios from 'axios';
import thunk from 'redux-thunk';
import { EDIT_PRODUCT } from './products';
const initialState = {};

const GOT_PRODUCT = 'GOT_PRODUCT';

export function gotProduct(fetchedProduct) {
  const action = {
    type: GOT_PRODUCT,
    payload: fetchedProduct
  };

  return action;
}

export function getProductThunk(productId) {
  const productFunc = async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);

      dispatch(gotProduct(data));
    } catch (er) {
      console.log(er);
    }
  };

  return productFunc;
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.payload;
    case EDIT_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default productReducer;
