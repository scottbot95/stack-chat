import io from 'socket.io-client';

import store from '../store';
import { addNewMessages } from '../store/messages/actions';

export default url => {
  console.log(`joining namespace ${url}`);
  const socket = io(url, { forceNew: true });
  socket.on('connect', () => {
    console.log('Connected to messages namespace');
  });

  socket.on('new-message', msg => {
    store.dispatch(addNewMessages(msg.channelId, msg));
  });

  return socket;
};
