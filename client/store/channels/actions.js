import { GET_CHANNELS } from './constants';
import axios from '../axios';

export const getChannels = channels => ({
  type: GET_CHANNELS,
  channels
});

export const fetchChannelList = async dispatch => {
  try {
    const channels = await axios.get('/api/channels');
    dispatch(getChannels(channels));
  } catch (error) {
    console.error(error);
  }
};
