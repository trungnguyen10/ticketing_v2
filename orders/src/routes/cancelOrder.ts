import {
  NotFoundError,
  OrderStatus,
  requireAuthentication,
} from '@tnticketingdev/common';
import express, { NextFunction, Request, Response } from 'express';
import { amqpConnection } from '../amqpConnection';
import { OrderDto } from '../Dtos/OrderDto';
import { resolvePublishAddress } from '../events/addressResolver';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { Order } from '../models/Order';

const router = express.Router();

router.put(
  '/api/orders/:orderId',
  requireAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order || order.userId !== req.currentUser!.id) {
      return next(new NotFoundError('order'));
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(
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

    res.status(200).send(OrderDto.FromOrderDocument(order));
  }
);

export { router as deleteOrder };
