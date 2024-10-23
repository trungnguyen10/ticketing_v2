import {
  currentUserHandler,
  errorHandler,
  GenericErrorMapper,
  InvalidErrorMapper,
  NotFoundError,
  NotFoundErrorMapper,
  ResourceExistsErrorMapper,
  UnauthorizedErrorMapper,
  ValidationErrorMapper,
} from '@tnticketingdev/common';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import { HttpProblemResponse } from 'express-http-problem-details';
import {
  DefaultMappingStrategy,
  MapperRegistry,
} from 'http-problem-details-mapper';
import { createTicket } from './routes/createTicket';
import { getTicketById } from './routes/getTicketById';

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

app.use(createTicket);
app.use(getTicketById);

app.use('/', (req, res) => {
  res.send('hello from tickets');
});
app.all('*', async (_req, _res, next) => {
  next(new NotFoundError());
});
app.use(errorHandler);
app.use(HttpProblemResponse({ strategy }));

export { app };
