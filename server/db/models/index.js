const User = require('./user');
const Channel = require('./channel');
const Message = require('./message');
const UserChannel = require('./userChannel');

module.exports = { User, Channel, Message, UserChannel };
// ASSOCIATIONS HERE

Message.belongsTo(User, { as: 'author' });
Message.belongsTo(Channel);

UserChannel.belongsTo(Message, { as: 'last_read' });

User.belongsToMany(Channel, { through: UserChannel });
Channel.belongsToMany(User, { through: UserChannel });
