import { DomainTopic } from './DomainTopic';

export interface TicketPayload {
  id: string;
  title: string;
  price: number;
}

export interface TicketCreatedEvent {
  topic: DomainTopic.TicketCreated;
  payload: TicketPayload;
}
