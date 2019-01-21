import initialState, { defaultMessages } from './initialState';
import { ADD_NEW_MESSAGES, ADD_OLD_MESSAGES, SET_MESSAGES } from './constants';

export default (state = initialState, action) => {
  const oldMessages = state[action.channelId] || defaultMessages;
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, [action.channelId]: action.messages };
    case ADD_OLD_MESSAGES:
      return {
        ...state,
        [action.channelId]: {
          ...oldMessages,
          messages: [...action.data.messages, ...oldMessages.messages],
          hasMore: action.data.hasMore
        }
      };
    case ADD_NEW_MESSAGES:
      return {
        ...state,
        [action.channelId]: {
          ...oldMessages,
          messages: [...oldMessages.messages, ...action.messages]
        }
      };
    default:
      return state;
  }
};
