module.exports = io => {
  io.on('connection', socket => {
    console.log(`A client has connected with id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has ended`);
    });
  });
};
