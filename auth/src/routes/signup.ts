import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ValidationError } from '../errors/Validation/ValidationError';
import { User } from '../models/User';
import { ResourceExistsError } from '../errors/ResourceExists/ResourceExistsError';

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      next(new ValidationError(errors.array()));
      return;
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new ResourceExistsError('email', email));
      return;
    }

    const user = User.build({ email, password });
    await user.save();
    res.send(user);
  }
);

export { router as signUpRouter };
