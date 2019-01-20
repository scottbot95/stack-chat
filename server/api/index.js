const router = require('express').Router();
module.exports = router;

// ensure user is logged in
router.use((req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.use('/channels', require('./channels'));
router.use('/messages', require('./messages'));
