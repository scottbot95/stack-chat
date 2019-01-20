const router = require('express').Router();
module.exports = router;

const { Message } = require('../db/models');

router.get('/channel/:channelId', async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;
  try {
    const messages = await Message.findAll({
      where: req.params,
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
    res.json({
      messages: messages.reverse(),
      hasMore: messages.length === +limit
    });
  } catch (error) {
    next(error);
  }
});
