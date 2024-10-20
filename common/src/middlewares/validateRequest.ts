import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/BadRequest/Validation/ValidationError';

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty() === false) {
    next(new ValidationError(errors.array()));
    return;
  }
  next();
};
