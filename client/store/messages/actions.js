import { ADD_NEW_MESSAGES, SET_MESSAGES, ADD_OLD_MESSAGES } from './constants';
import axios from '../axios';

export const setMessages = (channelId, messages) => ({
  type: SET_MESSAGES,
  channelId,
  messages
});

export const addNewMessages = (channelId, messages) => {
  if (!Array.isArray(messages)) {
    if (messages) messages = [messages];
    else messages = [];
  }
  return {
    type: ADD_NEW_MESSAGES,
    channelId,
    messages
  };
};

export const addOldMessages = (channelId, data) => ({
  type: ADD_OLD_MESSAGES,
  channelId,
  data
});

export const fetchMessages = (
  channelId,
  page = 1,
  limit = 20
) => async dispatch => {
  try {
    const res = await axios.get(`/api/messages/channel/${channelId}`, {
      params: { page, limit }
    });
    if (page === 1) dispatch(setMessages(channelId, res.data));
    else dispatch(addOldMessages(channelId, res.data));
  } catch (error) {
    console.error(error);
  }
};
