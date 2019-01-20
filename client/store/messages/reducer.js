import initialState from './initialState';
import { ADD_NEW_MESSAGES, ADD_OLD_MESSAGES, SET_MESSAGES } from './constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, [action.channelId]: action.messages };
    case ADD_OLD_MESSAGES:
      return {
        ...state,
        [action.channelId]: {
          ...state[action.channelId],
          messages: [
            ...action.data.messages,
            ...state[action.channelId].messages
          ],
          hasMore: action.data.hasMore
        }
      };
    case ADD_NEW_MESSAGES:
      return {
        ...state,
        [action.channelId]: {
          ...state[action.channelId],
          messages: [...state[action.channelId].messages, ...action.messages]
        }
      };
    default:
      return state;
  }
};
