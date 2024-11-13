import mongoose from 'mongoose';
import { app } from './app';
import { amqpConnection } from './amqpConnection';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined.');
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined.');
    }

if (!process.env.EVENT_BUS_USERNAME) {
  throw new Error('EVENT_BUS_USERNAME is not defined.');
}

if (!process.env.EVENT_BUS_PASSWORD) {
  throw new Error('EVENT_BUS_PASSWORD is not defined.');
}

const startAsync = async () => {
  await amqpConnection.connectAsync({
    host: 'event-bus-srv',
    port: 5672,
    username: process.env.EVENT_BUS_USERNAME,
    password: process.env.EVENT_BUS_PASSWORD,
  });
  await mongoose.connect(process.env.MONGO_URI!);
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
};

startAsync();
