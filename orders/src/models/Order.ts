import { OrderStatus } from '@tnticketingdev/common';
import mongoose, { Schema } from 'mongoose';
import { TicketDocument } from './Ticket';

interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocument;
}

export interface OrderDocument extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocument;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(order: IOrder): OrderDocument;
}

const orderSchema = new Schema<OrderDocument>({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
  },
  expiresAt: {
    type: Schema.Types.Date,
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  },
});

orderSchema.statics.build = (order: IOrder) => new Order(order);

export const Order = mongoose.model<OrderDocument, OrderModel>(
  'Order',
  orderSchema
);
