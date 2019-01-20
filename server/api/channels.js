/* eslint-disable no-case-declarations */
const router = require('express').Router();
module.exports = router;

const { UserChannel, Channel, User } = require('../db/models');

router.get('/', async (req, res, next) => {
  let channels;
  try {
    switch (req.query.mine) {
      case 'true':
        channels = await Channel.findAll({
          include: [{ model: UserChannel, where: { userId: req.user.id } }]
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
        channels = allChannels.filter(
          ch => joined.find(j => j.id === ch.id) === undefined
        );
        break;
      default:
        channels = await Channel.findAll();
    }
    res.json(channels);
  } catch (error) {
    next(error);
  }
});

router.get('/:channelId', async (req, res, next) => {
  try {
    const channel = (await Channel.findById(req.params.channelId, {
      include: User
    })).toJSON();
    channel.users = channel.users.reduce(
      (obj, user) => ({
        ...obj,
        [user.id]: user
      }),
      {}
    );
    if (channel.users[req.user.id] === undefined) {
      res.sendStatus(401);
    } else if (req.query.usersOnly !== undefined) {
      res.json({ id: req.params.channelId, users: channel.users });
    } else {
      res.json(channel);
    }
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
