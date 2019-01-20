import { ADD_NEW_MESSAGE, SET_MESSAGES, ADD_OLD_MESSAGES } from './constants';
import axios from '../axios';

export const setMessages = (channelId, messages) => ({
  type: SET_MESSAGES,
  channelId,
  messages
});

export const addNewMessage = (channelId, message) => ({
  type: ADD_NEW_MESSAGE,
  channelId,
  message
});

export const addOldMessages = (channelId, messages) => {
  if (!Array.isArray(messages)) {
    messages = [messages];
  }
  return {
    type: ADD_OLD_MESSAGES,
    channelId,
    messages
  };
};

export const fetchMessages = channelId => async dispatch => {
  try {
    const res = await axios.get(`/api/messages/channel/${channelId}`);
    dispatch(setMessages(channelId, res.data));
  } catch (error) {
    console.error(error);
  }
};
