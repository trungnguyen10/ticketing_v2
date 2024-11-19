import { OrderDocument } from '../models/Order';
import { TicketDto } from './TicketDto';

export class OrderDto {
  constructor(
    public id: string,
    public userId: string,
    public status: string,
    public expiresAt: Date,
    public ticket: TicketDto
  ) {}

  static FromOrderDocument(order: OrderDocument) {
    return new OrderDto(
      order.id,
      order.userId,
      order.status,
      order.expiresAt,
      TicketDto.FromTicketDocument(order.ticket)
    );
  }
}
