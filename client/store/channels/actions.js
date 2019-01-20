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

export const fetchChannelList = () => async dispatch => {
  try {
    const channels = await axios.get('/api/channels/?mine=true');
    dispatch(getChannels(channels.data));
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
