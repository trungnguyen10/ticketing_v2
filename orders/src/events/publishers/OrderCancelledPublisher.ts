import {
  DomainTopic,
  OrderCancelledEvent,
  Publisher,
} from '@tnticketingdev/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly topic = DomainTopic.OrderCancelled;
}
