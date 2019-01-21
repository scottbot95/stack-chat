const { Message } = require('../db/models');

module.exports = io => {
  io.on('connection', socket => {
    console.log(`Client ${socket.id} just connected to the messaging service`);
    socket.on('new-message', async msg => {
      try {
        const message = await Message.create(msg);
        io.emit('new-message', message);
      } catch (error) {
        console.error(error);
      }
    });
  });
};
