import mongoose from 'mongoose';
import { amqpConnection } from './amqpConnection';
import { app } from './app';
import { TicketCreatedSubscriber } from './events/subscribers/TicketCreatedSubscriber';
import { resolveSubscribeAddress } from './events/addressResolver';
import { TicketUpdatedSubscriber } from './events/subscribers/TicketUpdatedSubscriber';

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

const startAsync = async () => {
  await amqpConnection.connectAsync({
    host: process.env.EVENT_BUS_HOST,
    port: parseInt(process.env.EVENT_BUS_PORT!),
    username: process.env.EVENT_BUS_USERNAME,
    password: process.env.EVENT_BUS_PASSWORD,
  });
  await mongoose.connect(process.env.MONGO_URI!);

  new TicketCreatedSubscriber(
    amqpConnection,
    resolveSubscribeAddress
  ).subscribe();

  new TicketUpdatedSubscriber(
    amqpConnection,
    resolveSubscribeAddress
  ).subscribe();

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startAsync();
