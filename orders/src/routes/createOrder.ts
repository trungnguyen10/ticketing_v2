import {
  InvalidError,
  NotFoundError,
  OrderStatus,
  requireAuthentication,
  validateRequest,
} from '@tnticketingdev/common';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { OrderDto } from '../Dtos/OrderDto';
import { Order } from '../models/Order';
import { Ticket } from '../models/Ticket';
import { amqpConnection } from '../amqpConnection';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
import { resolvePublishAddress } from '../events/addressResolver';

const router = express.Router();

const EXPIRATION_WINDOW_SECOND = 15 * 60;

router.post(
  '/api/orders',
  requireAuthentication,
  body('ticketId').not().isEmpty().withMessage('TicketId must be provided'),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return next(new NotFoundError('ticket'));
    }

    const isReserved = await ticket.isReservedAsync();
    if (isReserved) {
      return next(new InvalidError('ticket is already reserved'));
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOND);

    const order = Order.build({
      userId: req.currentUser?.id!,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    await order.save();

    await new OrderCreatedPublisher(
      amqpConnection,
      resolvePublishAddress
    ).publishAsync({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });

    res.status(201).send(OrderDto.FromOrderDocument(order));
  }
);

export { router as createOrder };
