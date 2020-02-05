import axios from 'axios';
import thunk from 'redux-thunk';
import productListingReducer, { editProductListing } from './productListing';
// constants to be moved to a constants.js file
const SET_PRODUCTS = Symbol('set_products');
const ADD_PRODUCT = Symbol('add_product');
const DELETE_PRODUCT = Symbol('delete_product');
export const EDIT_PRODUCT = Symbol('edit_product');

// action creators

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

export const newProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  };
};

export const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  };
};

export const editProduct = product => {
  console.log('edit product creator');
  return {
    type: EDIT_PRODUCT,
    product
  };
};

// thunks

export const fetchProductsOfACat = categoryId => {
  return async dispatch => {
    const products = (await axios.get(`/api/categories/${categoryId}`)).data;
    return dispatch(setProducts(products));
  };
};
export const fetchProducts = () => {
  return async dispatch => {
    const products = (await axios.get('/api/products')).data;
    return dispatch(setProducts(products));
  };
};

export const createProduct = product => {
  return async dispatch => {
    const postedProduct = (await axios.post('/api/products', product)).data;
    return dispatch(newProduct(postedProduct));
  };
};

export const removeProduct = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`);
    return dispatch(deleteProduct(product));
  };
};

export const updateProductThunk = (productId, productListingId, edits) => {
  // console.log('updateProduct thunk edits:', edits);

  return async (dispatch, getState) => {
    const editedProduct = (
      await axios.put(`/api/productListings/editproduct`, {
        productId,
        productListingId,
        edits
      })
    ).data;
    const prevePL = getState().productListing;
    const prevProds = getState().products;
    //const { product, productListing, } = editedProduct;
    const { foundProductToUpdate } = editedProduct;
    console.log('editedProduct in updateProductThunk', editedProduct);
    console.log(
      'editedProduct.productListing in updateProductThunk',
      editedProduct.productListing
    );
    dispatch(editProduct(editedProduct));
    // if (product) {
    //   if (!productListing) {
    //     product.productListing = prevProds;
    //   } else {
    //     product.productListing = productListing;
    //   }
    //   dispatch(editProduct(product));
    // }

    // console.log('dispatched product');
    // if (productListing) {
    //   console.log('dispatching product listing');
    //   dispatch(editProductListing(productListing));
    // }
  };
};

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.product.id) return action.product;
        return product;
      });
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    default:
      return state;
  }
};

export default productsReducer;
