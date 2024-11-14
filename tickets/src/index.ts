import mongoose from 'mongoose';
import { app } from './app';
import { amqpConnection } from './amqpConnection';
import { Agenda } from '@hokify/agenda';
import { publishOutBoxItemAsync } from './OutBox/publishOutBoxItem';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined.');
}

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY is not defined.');
}

if (!process.env.EVENT_BUS_HOST) {
  throw new Error('EVENT_BUS_HOST is not defined.');
}
if (!process.env.EVENT_BUS_PORT) {
  throw new Error('EVENT_BUS_PORT is not defined.');
}
if (!process.env.EVENT_BUS_USERNAME) {
  throw new Error('EVENT_BUS_USERNAME is not defined.');
}

if (!process.env.EVENT_BUS_PASSWORD) {
  throw new Error('EVENT_BUS_PASSWORD is not defined.');
}

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

agenda.define('ticket background job', async (_job) => {
  try {
    console.log('Handling background job...');
    await publishOutBoxItemAsync();
  } catch (err) {
    console.log('ERROR OCCURRED', err);
  }
});

const startAsync = async () => {
  await amqpConnection.connectAsync({
    host: process.env.EVENT_BUS_HOST,
    port: parseInt(process.env.EVENT_BUS_PORT!),
    username: process.env.EVENT_BUS_USERNAME,
    password: process.env.EVENT_BUS_PASSWORD,
  });
  await mongoose.connect(process.env.MONGO_URI!);
  await agenda.start();

  await agenda.every('5 seconds', 'ticket background job');
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startAsync();
