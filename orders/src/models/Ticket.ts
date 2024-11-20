import { Document, model, Model, Schema } from 'mongoose';
import { Order } from './Order';
import { OrderStatus } from '@tnticketingdev/common';

interface ITicket {
  id: string;
  title: string;
  price: number;
}

interface TicketModel extends Model<TicketDocument> {
  build(ticketProperties: ITicket): TicketDocument;
}

export interface TicketDocument extends Document {
  title: string;
  price: number;

  /**
   * true when the ticket is referenced by a non 'Cancelled' order
   */
  isReservedAsync(): Promise<boolean>;
}

const ticketSchema = new Schema<TicketDocument>({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
});

ticketSchema.statics.build = (ticket: ITicket) =>
  new Ticket({
    _id: ticket.id,
    title: ticket.title,
    price: ticket.price,
  });

ticketSchema.methods.isReservedAsync = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $ne: OrderStatus.Cancelled,
    },
  });

  return !!existingOrder;
};

export const Ticket = model<TicketDocument, TicketModel>(
  'Ticket',
  ticketSchema
);
