const db = require('../db');

const UserChannel = db.define(
  'user_channel',
  {},
  {
    timestamps: true,
    createdAt: 'joinedAt',
    updatedAt: 'lastReadTime'
  }
);

module.exports = UserChannel;
