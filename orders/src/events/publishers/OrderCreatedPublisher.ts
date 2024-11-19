import {
  DomainTopic,
  OrderCreatedEvent,
  Publisher,
} from '@tnticketingdev/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly topic = DomainTopic.OrderCreated;
}
