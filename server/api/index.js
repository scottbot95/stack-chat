const router = require('express').Router();
module.exports = router;

router.use('/channels', require('./channels'));
