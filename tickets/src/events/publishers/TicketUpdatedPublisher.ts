import {
  DomainTopic,
  Publisher,
  TicketUpdatedEvent,
} from '@tnticketingdev/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly topic = DomainTopic.TicketUpdated;
}
