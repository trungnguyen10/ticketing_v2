import { DomainTopic } from './DomainTopic';
import { OrderStatus } from './types/OrderStatus';

export interface OrderPayload {
  id: string;
  status: OrderStatus;
  userId: string;
  expiresAt: string;
  ticket: {
    id: string;
    price: number;
  };
}

export interface OrderCreatedEvent {
  topic: DomainTopic.OrderCreated;
  payload: OrderPayload;
}

export interface OrderCancelledEvent {
  topic: DomainTopic.OrderCancelled;
  payload: OrderPayload;
}
