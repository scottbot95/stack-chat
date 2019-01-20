import initialState from './initialState';
import { GET_CHANNELS, JOIN_CHANNEL } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;
    case JOIN_CHANNEL:
      return [...state, action.channel];
    default:
      return state;
  }
};
