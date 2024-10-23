import express, { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { InvalidError, NotFoundError } from '@tnticketingdev/common';
import { TicketDto } from '../Dtos/TicketDto';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/tickets/:id',
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

export { router as getTicketById };
