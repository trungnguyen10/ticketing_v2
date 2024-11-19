import { requireAuthentication } from '@tnticketingdev/common';
import express, { Request, Response } from 'express';
import { OrderDto } from '../Dtos/OrderDto';
import { Order } from '../models/Order';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuthentication,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id!;
    const orders = await Order.find({
      userId: userId,
    }).populate('ticket');

    res.status(200).send(orders.map((o) => OrderDto.FromOrderDocument(o)));
  }
);

export { router as getOrders };
