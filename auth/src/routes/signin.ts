import { InvalidError, validateRequest } from '@tnticketingdev/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserDto } from '../Dtos/UserDto';
import { User } from '../models/User';
import { Password } from '../utilities/Password';

const router = express.Router();

router.post(
  '/api/users/signin',
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Password must be provided'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || (await Password.compare(user.password, password)) === false) {
      next(new InvalidError('Invalid email or password'));
      return;
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(new UserDto(user));
  }
);

export { router as signInRouter };
