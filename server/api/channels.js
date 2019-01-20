/* eslint-disable no-case-declarations */
const router = require('express').Router();
module.exports = router;

const Sequelize = require('sequelize');

const { UserChannel, Channel, User } = require('../db/models');

// ensure user is logged in
router.use((req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.get('/', async (req, res, next) => {
  let channels;
  try {
    switch (req.query.mine) {
      case 'true':
        channels = await UserChannel.findAll({
          where: { userId: req.user.id },
          include: [
            {
              model: Channel
            }
          ]
        });
        break;
      case 'false':
        const joinedP = Channel.findAll({
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: [],
              where: {
                id: req.user.id
              }
            }
          ]
        });
        const channelsP = Channel.findAll();
        const [joined, allChannels] = await Promise.all([joinedP, channelsP]);
        console.log(
          joined.map(i => i.id),
          '******',
          allChannels.map(i => i.id)
        );
        channels = allChannels.filter(
          ch => joined.find(j => j.id === ch.id) === undefined
        );
        console.log(channels.length);
        break;
      default:
        channels = await Channel.findAll();
    }
    res.json(channels);
  } catch (error) {
    next(error);
  }
});

router.put('/join/:channelId', async (req, res, next) => {
  try {
    await UserChannel.create({
      userId: req.user.id,
      channelId: req.params.channelId
    });
    const userChannel = await UserChannel.findOne({
      where: { channelId: req.params.channelId, userId: req.user.id },
      include: Channel
    });
    res.status(201).json(userChannel);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send('You have already joined that channel');
    } else {
      next(error);
    }
  }
});
