import axios from 'axios';

const initialState = {};

const GOT_PRODUCTLISTING = 'GOT_PRODUCTLISTING';
const EDIT_PRODUCTLISTING = 'EDIT_PRODUCTLISTING';

export function gotProductListing(fetchedProductListing) {
  const action = {
    type: GOT_PRODUCTLISTING,
    payload: fetchedProductListing
  };
  console.log('got product listing creator', action);
  return action;
}

export function editProductListing(editedProductListing) {
  console.log('edit listing creator');
  const action = {
    type: EDIT_PRODUCTLISTING,
    payload: editedProductListing
  };
  console.log('action.payload.editiedProductListing', action.payload);
  return action;
}

export function getProductListingThunk(productListingId) {
  const productListingFunc = async dispatch => {
    try {
      const { data } = await axios.get(
        `/api/productListing/${productListingId}`
      );

      dispatch(gotProductListing(data));
    } catch (er) {
      console.log(er);
    }
  };

  return productListingFunc;
}

const productListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTLISTING:
      return action.payload;
    case EDIT_PRODUCTLISTING:
      if (state.id === action.payload.id) return action.payload;
    default:
      return state;
  }
};

export default productListingReducer;
