import { ValidationError as ExpressValidationError } from 'express-validator';
import { InvalidError } from '../InvalidError';

export type ErrorDetail = { [key: string]: string[] };

export class ValidationError extends InvalidError {
  constructor(public errors: ExpressValidationError[]) {
    super(undefined, 'One or more validation errors occurred.');
  }
}
