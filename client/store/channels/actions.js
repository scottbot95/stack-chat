import { GET_CHANNELS, JOIN_CHANNEL, GET_CHANNEL_DETAILS } from './constants';
import axios from '../axios';

export const getChannels = channels => ({
  type: GET_CHANNELS,
  channels
});

export const addJoinedChannel = channel => ({
  type: JOIN_CHANNEL,
  channel
});

export const getChannelDetails = channel => ({
  type: GET_CHANNEL_DETAILS,
  channel
});

export const fetchChannelList = (mine = true) => async dispatch => {
  try {
    const res = await axios.get('/api/channels/', { params: { mine } });
    if (mine) dispatch(getChannels(res.data));
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchChannelDetails = (
  channelId,
  usersOnly = true
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/channels/${channelId}${usersOnly ? '?usersOnly' : ''}`
    );
    dispatch(getChannelDetails(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const joinChannel = channelId => async dispatch => {
  try {
    const channel = await axios.put(`/api/channels/join/${channelId}`);
    dispatch(addJoinedChannel(channel.data));
  } catch (error) {
    console.error(error);
  }
};

export const createChannel = name => async dispatch => {
  try {
    const channel = await axios.post('/api/channels', { name });
    dispatch(addJoinedChannel(channel.data));
  } catch (error) {
    console.error(error);
  }
};
