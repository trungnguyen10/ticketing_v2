import { TicketDocument } from '../models/Ticket';

export class TicketDto {
  constructor(public id: string, public title: string, public price: number) {}

  public static FromTicketDocument(ticket: TicketDocument) {
    return new TicketDto(ticket.id.toString(), ticket.title, ticket.price);
  }
}
