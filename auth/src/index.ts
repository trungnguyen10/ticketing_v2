import { json } from 'body-parser';
import express from 'express';
import { HttpProblemResponse } from 'express-http-problem-details';
import {
  DefaultMappingStrategy,
  MapperRegistry,
} from 'http-problem-details-mapper';
import mongoose from 'mongoose';
import { GenericErrorMapper } from './errors/GenericErrorMapper';
import { NotFoundError } from './errors/NotFound/NotFoundError';
import { NotFoundErrorMapper } from './errors/NotFound/NotFoundErrorMapper';
import { ValidationErrorMapper } from './errors/Validation/ValidationErrorMapper';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { ResourceExistsErrorMapper } from './errors/ResourceExists/ResourceExistsErrorMapper';

const strategy = new DefaultMappingStrategy(
  new MapperRegistry({ useDefaultErrorMapper: false })
    .registerMapper(new GenericErrorMapper())
    .registerMapper(new ValidationErrorMapper())
    .registerMapper(new NotFoundErrorMapper())
    .registerMapper(new ResourceExistsErrorMapper())
);

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', async (_req, _res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
app.use(HttpProblemResponse({ strategy }));

mongoose
  .connect('mongodb://auth-mongo-srv:27017/auth')
  .then(() => {
    app.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
  })
  .catch((error) => console.log(error));
