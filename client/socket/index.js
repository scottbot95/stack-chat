import io from 'socket.io-client';
import Cookies from 'js-cookie';
import messageIO from './messages';

import pkg from '../../package.json';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : pkg.homepage;

const socket = io(url, { forceNew: true });
export const messageSocket = messageIO(`${url}/messages`);

socket.on('connect', () => {
  console.log('Connected to server!');
});

export default socket;
