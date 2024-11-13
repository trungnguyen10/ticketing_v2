import {
  DomainTopic,
  requireAuthentication,
  validateRequest,
} from '@tnticketingdev/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketDto } from '../Dtos/TicketDto';
import { Ticket } from '../models/Ticket';
import { OutBoxItem } from '../OutBox/OutBoxItem';

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

    // TODO: wrapping around a transaction requires to setup replica set for local instance of MongoDb
    const outBoxItem = await OutBoxItem.create({
      topic: DomainTopic.TicketCreated.toString(),
      payload: {
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      },
    });

    await outBoxItem.save();

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
