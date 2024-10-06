import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ValidationError } from '../errors/Validation/ValidationError';

const router = express.Router();

router.post(
  '/api/users/signup',
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      throw new ValidationError(errors.array());
    }
    const { email, password } = req.body;
    console.log({ email, password });

    res.send('Hello');
  }
);

export { router as signUpRouter };
