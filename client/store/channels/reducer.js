import initialState from './initialState';
import { GET_CHANNELS, JOIN_CHANNEL, GET_CHANNEL_DETAILS } from './constants';

export default (state = initialState, action) => {
  let channelIdx;
  switch (action.type) {
    case GET_CHANNELS:
      return action.channels;
    case JOIN_CHANNEL:
      return [...state, action.channel];
    case GET_CHANNEL_DETAILS:
      action.channel.id = Number(action.channel.id);
      channelIdx = state.findIndex(channel => channel.id === action.channel.id);
      if (channelIdx === -1) return state;
      return [
        ...state.slice(0, channelIdx),
        { ...state[channelIdx], ...action.channel },
        ...state.slice(channelIdx + 1)
      ];
    default:
      return state;
  }
};
