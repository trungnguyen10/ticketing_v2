import { Document, model, Model, Schema } from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends Model<TicketDocument> {
  build(ticketProperties: ITicket): TicketDocument;
}

export interface TicketDocument extends Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new Schema<TicketDocument>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

ticketSchema.statics.build = (ticket: ITicket) => new Ticket(ticket);

export const Ticket = model<TicketDocument, TicketModel>(
  'Ticket',
  ticketSchema
);
