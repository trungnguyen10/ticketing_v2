import {
  DomainTopic,
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
import { OutBoxItem } from '../OutBox/OutBoxItem';

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

    // TODO: wrapping around a transaction requires to setup replica set for local instance of MongoDb
    const outBoxItem = await OutBoxItem.create({
      topic: DomainTopic.TicketUpdated.toString(),
      payload: {
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      },
    });

    await outBoxItem.save();

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
