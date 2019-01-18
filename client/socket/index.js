import io from 'socket.io-client';

import pkg from '../../package.json';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : pkg.homepage;

const socket = io(url);

socket.on('connect', () => {
  console.log('Connected to server!');
});
