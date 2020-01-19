import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {};

const GOT_PRODUCT = 'GOT_PRODUCT';

export function gotProduct(fetchedProduct) {
  const action = {
    type: GOT_PRODUCT,
    payload: fetchedProduct
  };
  console.log('action gotProduct', action);
  return action;
}

export function getProductThunk(productId) {
  const productFunc = async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      console.log('get product thunk', data);
      dispatch(gotProduct(data));
    } catch (er) {
      console.log(er);
    }
  };
  console.log('productFunc', productFunc);
  return productFunc;
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
