import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = {};

const GOT_PRODUCT = 'GOT_PRODUCT';
const EDIT_SINGLE_PRODCT = 'EDIT_SINGLE_PRODCT';

export function gotProduct(fetchedProduct) {
  const action = {
    type: GOT_PRODUCT,
    payload: fetchedProduct
  };

  return action;
}

export function getProductThunk(productId) {
  console.log('getProductTHUNK is firing', productId);
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

export function editSingleProduct(editedProduct) {
  const action = {
    type: EDIT_SINGLE_PRODCT,
    payload: editedCampus
  };

  return action;
}

export function editSingleProductThunk(id) {
  console.log('PRODUCT in edit thunk', product);
  const dispatchFunc = async dispatch => {
    try {
      const response = await axios.put(`/api/products/${iproductId}`, product);
      dispatch(editSingleProduct(response.data));
    } catch (er) {
      console.log(er);
    }
  };
  return dispatchFunc;
}
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.payload;
    case EDIT_SINGLE_PRODCT:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
