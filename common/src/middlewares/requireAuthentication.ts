import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/Unauthorized/UnauthorizedError';

export const requireAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.currentUser) {
    next();
    return;
  }
  next(new UnauthorizedError());
};
