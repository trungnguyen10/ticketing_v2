import { ValidationError as ExpressValidationError } from 'express-validator';
import { BadRequestError } from '../BadRequestError';

export type ErrorDetail = { [key: string]: string[] };

export class ValidationError extends BadRequestError {
  constructor(public errors: ExpressValidationError[]) {
    super(undefined, 'One or more validation errors occurred.');
  }
}
