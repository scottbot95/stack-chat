const router = require('express').Router();
module.exports = router;

const { Message, User } = require('../db/models');

router.get('/channel/:channelId', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: req.params,
      include: [
        {
          model: User,
          as: 'author'
        }
      ]
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});
