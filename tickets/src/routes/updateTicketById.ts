import {
  InvalidError,
  NotFoundError,
  requireAuthentication,
  UnauthorizedError,
  validateRequest,
} from '@tnticketingdev/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { TicketDto } from '../Dtos/TicketDto';
import { Ticket } from '../models/Ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuthentication,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      next(new InvalidError('Invalid ticket id'));
      return;
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      next(new NotFoundError('ticket'));
      return;
    }

    if (ticket.userId !== req.currentUser!.id) {
      next(new UnauthorizedError());
      return;
    }

    const { title, price } = req.body;
    ticket.set({ title, price });
    await ticket.save();
    res
      .status(200)
      .send(
        new TicketDto(
          ticket._id!.toString(),
          ticket.title,
          ticket.price,
          ticket.userId
        )
      );
  }
);

export { router as updatedTicketById };
