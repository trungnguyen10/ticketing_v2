import { requireAuthentication, validateRequest } from '@tnticketingdev/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketDto } from '../Dtos/TicketDto';
import { Ticket } from '../models/Ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuthentication,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId });
    await ticket.save();
    res
      .status(201)
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

export { router as createTicket };
