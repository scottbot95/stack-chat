const faker = require('faker');
const random = require('random');
const seedrandom = require('seedrandom');

const db = require('./server/db');
const { User, Channel, Message, UserChannel } = require('./server/db/models');

const NUM_USERS = process.env.NUM_USERS || 50;
const NUM_CHANNELS = process.env.NUM_CHANNELS || 5;
const AVG_CHANNELS_PER_USER = process.env.AVG_CHANNELS_PER_USER || 2;
const SIGMA_CHANNELS_PER_USER = process.env.SIGMA_CHANNELS_PER_USER || 1;
const AVG_NUM_MESSAGES = process.env.AVG_NUM_MESSAGES || 10;

function seedUsers() {
  const usersP = new Array(NUM_USERS);
  usersP[0] = User.create({
    realName: 'Scott Techau',
    username: 'scottyboy',
    password: 'password',
    imageUrl: faker.image.avatar()
  });

  for (let i = 1; i < NUM_USERS; i++) {
    usersP[i] = User.create({
      realName: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      imageUrl: faker.image.avatar()
    });
  }

  return Promise.all(usersP);
}

function seedChannels() {
  const channelsP = new Array(NUM_CHANNELS);
  for (let i = 0; i < NUM_CHANNELS; i++) {
    channelsP[i] = Channel.create({ name: faker.random.word() });
  }

  return Promise.all(channelsP);
}

function seedUserChannels(users, channels) {
  const promises = [];

  const normal = random.normal(AVG_CHANNELS_PER_USER, SIGMA_CHANNELS_PER_USER);

  for (let i = 0; i < NUM_USERS; i++) {
    const user = users[i];
    const numChannels = Math.min(Math.floor(normal()), NUM_CHANNELS);

    const addedChannels = {};
    for (let j = numChannels; j > 0; j--) {
      const channelId = channels[random.int(0, channels.length - 1)].id;
      if (addedChannels[channelId]) {
        j++;
      } else {
        addedChannels[channelId] = true;
        promises.push(UserChannel.create({ userId: user.id, channelId }));
      }
    }
  }

  return Promise.all(promises);
}

async function seedMessages(userChannels) {
  const normal = random.normal(AVG_NUM_MESSAGES, AVG_NUM_MESSAGES / 4);
  const numMessages = Math.ceil(userChannels.length * Math.max(1, normal()));

  const messages = new Array(numMessages);
  for (let i = 0; i < messages.length; i++) {
    if (i > 0 && i % 100 === 0) console.log(`seeded ${i} messages`);
    const userChannel =
      userChannels[faker.random.number(userChannels.length - 1)];

    const numSentences =
      i % 15 === 0 ? 10 : faker.random.number({ min: 1, max: 3 });

    messages[i] =
      // eslint-disable-next-line no-await-in-loop
      await Message.create({
        text: faker.lorem.sentences(numSentences),
        authorId: userChannel.userId,
        channelId: userChannel.channelId
      });
  }

  return messages;
}

async function seed() {
  console.time('seeding successful! took');
  await db.sync({ force: true, alter: false });
  console.log('db synced!');
  const randSeed = process.env.RAND_SEED || 123;
  faker.seed(randSeed);
  random.use(seedrandom(randSeed));

  const channels = await seedChannels();
  console.log(`seeded ${channels.length} channels`);

  const users = await seedUsers();
  console.log(`seeded ${users.length} users`);

  const userChannels = await seedUserChannels(users, channels);
  console.log(`added users to ${userChannels.length} channels`);

  const messages = await seedMessages(userChannels);
  console.log(`seeded ${messages.length} messages`);

  console.timeEnd('seeding successful! took');
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.error('Failed to seed database');
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection...');
    await db.close();
    console.log('db connection closed.');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
