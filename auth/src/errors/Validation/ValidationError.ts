import { ValidationError as ExpressValidationError } from 'express-validator';

export class ValidationError extends Error {
  constructor(public errors: ExpressValidationError[]) {
    super();
  }
}
