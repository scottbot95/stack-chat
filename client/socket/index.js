import io from 'socket.io-client';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://scotts-stack-chat.herokuapp.com';

const socket = io(url);

socket.on('connect', () => {
  console.log('Connected to server!');
});
