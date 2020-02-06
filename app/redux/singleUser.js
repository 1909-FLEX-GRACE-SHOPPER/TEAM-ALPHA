import axios from 'axios';
// action types
const GET_SINGEL_USER = 'GET_SINGEL_USER';

// action creators
const getSingelUser = user => {
  return {
    type: GET_SINGEL_USER,
    user
  };
};

//thunks
export const fetchSingelUser = id => {
  return dispatch => {
    return axios
      .get(`/api/users/${id}`)
      .then(response => dispatch(getSingelUser(response.data)))
      .catch(e => console.log('Error in thunk:', e.message));
  };
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGEL_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
