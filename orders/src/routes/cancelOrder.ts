import {
  NotFoundError,
  OrderStatus,
  requireAuthentication,
} from '@tnticketingdev/common';
import express, { NextFunction, Request, Response } from 'express';
import { Order } from '../models/Order';
import { OrderDto } from '../Dtos/OrderDto';

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

    res.status(200).send(OrderDto.FromOrderDocument(order));
  }
);

export { router as deleteOrder };
