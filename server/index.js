const session = require('express-session');
const SequelizeSession = require('connect-session-sequelize')(session.Store);
const socketio = require('socket.io');

const db = require('./db');
const app = require('./app');

const sessionStore = new SequelizeSession({ db });
const PORT = process.env.PORT || 8080;

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`Stupendously servering solicitations on port ${PORT}`);
  });

  const io = socketio(server);
  // eslint-disable-next-line global-require
  require('./sockets')(io);
};

const dbSync = () => db.sync();

const bootApp = async () => {
  await sessionStore.sync();
  await dbSync();
  await startListening();
};

bootApp();
