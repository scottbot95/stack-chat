const { Message } = require('../db/models');

module.exports = io => {
  io.on('connection', socket => {
    console.log(`Client ${socket.id} just connected to the messaging service`);
    socket.on('new-message', async (msg, callback) => {
      try {
        const message = await Message.create(msg);
        io.emit('new-message', message);
        callback();
      } catch (error) {
        console.error(error);
      }
    });
  });
};
