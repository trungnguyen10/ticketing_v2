import {
  DomainTopic,
  Publisher,
  TicketCreatedEvent,
} from '@tnticketingdev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly topic = DomainTopic.TicketCreated;
}
