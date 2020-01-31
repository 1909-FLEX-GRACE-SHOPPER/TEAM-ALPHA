import axios from 'axios';
import thunk from 'redux-thunk';
//action types
const SET_ALLUSERS = 'SET_ALLUSERS';
const ADD_USER = 'ADD_USER';

//action creators
const setUsers = users => {
  return {
    type: SET_ALLUSERS,
    users
  };
};
const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

//thunks
export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(responses => dispatch(setUsers(responses.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const createUser = user => {
  return dispatch => {
    return axios
      .post('/api/users', user)
      .then(response => dispatch(addUser(response.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};
export const removeUser = id => {
  return dispatch => {
    return axios
      .delete(`/api/users${id}`)
      .then(response => {
        return axios
          .get('/api/users')
          .then(responses => dispatch(fetchUsers(responses.data)));
      })
      .catch(e => console.log('Error in thunk:', e.message));
  };
};
export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}`, user)
      .then(response => {
        return axios
          .get('/api/users/')
          .then(response => dispatch(fetchUsers(response.data)));
      })
      .catch(e => console.log('Error in thunk:', e.message));
  };
};

const initialState = [];

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALLUSERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];

    default:
      return state;
  }
};

export default usersReducer;
