const Sequelize = require('sequelize');
const db = require('../db');

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('channel', 'dm'),
    allowNull: false,
    defaultValue: 'channel'
  }
});

module.exports = Channel;
