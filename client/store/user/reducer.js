import initialState from './initialState';
import { GET_USER } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};
