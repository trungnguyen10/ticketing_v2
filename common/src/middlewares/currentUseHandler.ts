import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUserHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let payload: UserPayload | undefined = undefined;
  try {
    if (req.session?.jwt) {
      payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;
    }
  } catch (err) {
    console.log(err);
  }
  req.currentUser = payload;
  next();
};
