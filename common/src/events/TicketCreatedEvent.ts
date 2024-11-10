import { DomainTopic } from './DomainTopic';

export interface TicketPayload {
  id: string;
  title: string;
  price: number;
  userId: string;
}

export interface TicketCreatedEvent {
  topic: DomainTopic.TicketCreated;
  payload: TicketPayload;
}
