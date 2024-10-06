import { json } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { HttpProblemResponse } from 'express-http-problem-details';
import {
  DefaultMappingStrategy,
  MapperRegistry,
} from 'http-problem-details-mapper';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

import { GenericErrorMapper } from './errors/GenericErrorMapper';
import { NotFoundError } from './errors/NotFound/NotFoundError';
import { NotFoundErrorMapper } from './errors/NotFound/NotFoundErrorMapper';
import { ValidationErrorMapper } from './errors/Validation/ValidationErrorMapper';

const strategy = new DefaultMappingStrategy(
  new MapperRegistry({ useDefaultErrorMapper: false })
    .registerMapper(new GenericErrorMapper())
    .registerMapper(new ValidationErrorMapper())
    .registerMapper(new NotFoundErrorMapper())
);

const app = express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', async (_req, _res, next) => {
  next(new NotFoundError());
}),
  app.use(errorHandler);
app.use(HttpProblemResponse({ strategy }));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
