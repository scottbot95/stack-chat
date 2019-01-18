/* eslint-disable func-names */
const Sequelize = require('sequelize');
const crypto = require('crypto');
const db = require('../db');

const User = db.define('user', {
  realName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // make field act as func, hides during serialization
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // make field act as func, hides during serialization
    get() {
      return () => this.getDataValue('salt');
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    // eslint-disable-next-line no-param-reassign
    user.salt = User.generateSalt();
    // eslint-disable-next-line no-param-reassign
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
