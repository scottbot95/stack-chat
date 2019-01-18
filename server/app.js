const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const User = require('./db/models');

const app = express();
module.exports = app;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(morgan('dev'));
