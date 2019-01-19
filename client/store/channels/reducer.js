import initialState from './initialState';
import { GET_CHANNELS } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;
    default:
      return state;
  }
};
