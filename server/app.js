/* eslint-disable global-require */
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SequelizeSession = require('connect-session-sequelize')(session.Store);
const passportSocketIo = require('passport.socketio');
const socketio = require('socket.io');

const db = require('./db');

if (process.env.NODE_ENV === 'development') require('../secrets');

const User = db.models.user;

const app = express();
module.exports = app;

const sessionStore = new SequelizeSession({ db });
const PORT = process.env.PORT || 8080;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

let sessionMiddleware = [];

const createApp = () => {
  // loggin middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // session middleware with passport
  sessionMiddleware = [
    session({
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    }),
    passport.initialize(),
    passport.session()
  ];

  sessionMiddleware.forEach(m => app.use(m));

  // sessionMiddleware = [
  //   passportSocketIo.authorize({
  //     key: 'connect.sid',
  //     secret: process.env.SESSION_SECRET,
  //     store: sessionStore,
  //     passport,
  //     success: (data, accept) => {
  //       console.log(data);
  //       accept();
  //     },
  //     fail: (data, msg, error, accept) => {
  //       console.error(msg);
  //       if (error) console.error(error);
  //     }
  //   })
  // ];
  sessionMiddleware = [];

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // error handling endware
  app.use((err, req, res, next) => {
    if (!err.status) console.error(err);
    if (res.headerSent) {
      next(err);
    }
    res.status(err.status || 500);
    res.send(err.message || 'Internal server error');
  });
};

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`Stupendously servering solicitations on port ${PORT}`);
  });

  const io = socketio(server);
  // eslint-disable-next-line global-require
  require('./sockets')(io, sessionMiddleware);
};

const dbSync = () => db.sync();

const bootApp = async () => {
  await sessionStore.sync();
  await createApp();
  await dbSync();
  await startListening();
};

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
