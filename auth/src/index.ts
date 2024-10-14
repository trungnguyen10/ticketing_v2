import mongoose from 'mongoose';
import { app } from './app';

mongoose
  .connect('mongodb://auth-mongo-srv:27017/auth')
  .then(() => {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined.');
    }
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch((error) => console.log(error));
