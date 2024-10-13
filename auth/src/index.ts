import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import { HttpProblemResponse } from 'express-http-problem-details';
import {
  DefaultMappingStrategy,
  MapperRegistry,
} from 'http-problem-details-mapper';
import mongoose from 'mongoose';
import { InvalidErrorMapper } from './errors/BadRequest/InvalidErrorMapper';
import { ResourceExistsErrorMapper } from './errors/BadRequest/ResourceExists/ResourceExistsErrorMapper';
import { ValidationErrorMapper } from './errors/BadRequest/Validation/ValidationErrorMapper';
import { GenericErrorMapper } from './errors/GenericErrorMapper';
import { NotFoundError } from './errors/NotFound/NotFoundError';
import { NotFoundErrorMapper } from './errors/NotFound/NotFoundErrorMapper';
import { UnauthorizedErrorMapper } from './errors/Unauthorized/UnauthorizedErrorMapper';
import { currentUserHandler } from './middlewares/currentUseHandler';
import { errorHandler } from './middlewares/errorHandler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const strategy = new DefaultMappingStrategy(
  new MapperRegistry({ useDefaultErrorMapper: false })
    .registerMapper(new GenericErrorMapper())
    .registerMapper(new ValidationErrorMapper())
    .registerMapper(new NotFoundErrorMapper())
    .registerMapper(new ResourceExistsErrorMapper())
    .registerMapper(new InvalidErrorMapper())
    .registerMapper(new UnauthorizedErrorMapper())
);

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserHandler);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', async (_req, _res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
app.use(HttpProblemResponse({ strategy }));

if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY is not defined.');
}

mongoose
  .connect('mongodb://auth-mongo-srv:27017/auth')
  .then(() => {
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch((error) => console.log(error));
