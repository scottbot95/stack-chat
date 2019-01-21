const messagesHandler = require('./messages');

const namespaces = {
  '/messages': messagesHandler
};

const wrapMiddleware = middleware => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = (io, middleware) => {
  const names = Object.keys(namespaces);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const handler = namespaces[name];
    const namespace = io.of(name);
    middleware.forEach(m => namespace.use(wrapMiddleware(m)));
    handler(namespace);
  }

  middleware.forEach(m => io.use(wrapMiddleware(m)));

  io.on('connection', socket => {
    console.log(`A client has connected with id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has ended`);
    });
  });
};
