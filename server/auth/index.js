const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

router.post('/login', async (req, res, next) => {
  const loginError = new Error('Wrong username and/or password');
  loginError.status = 401;

  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });
    if (!user) {
      console.log(`User ${req.body.username} not found`);
      next(loginError);
    } else if (!user.correctPassword(req.body.password)) {
      console.log(`Incorrect password for user ${req.body.username}`);
      next(loginError);
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.status(201).json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const authError = new Error('User already exists');
      authError.status = 401;
      next(authError);
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res) => {
  res.json(req.user);
});
