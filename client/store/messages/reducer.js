import initialState from './initialState';
import { ADD_NEW_MESSAGE, SET_MESSAGES } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, [action.channelId]: action.messages };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        [action.channelId]: [...state[action.channelId], action.message]
      };
    default:
      return state;
  }
};
