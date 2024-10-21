import mongoose from 'mongoose';
import { app } from './app';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined.');
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined.');
    }
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch((error) => console.log(error));
