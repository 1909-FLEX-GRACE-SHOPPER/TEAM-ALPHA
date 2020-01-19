import axios from 'axios';
import thunk from 'redux-thunk';

const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;
