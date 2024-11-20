import {
  DomainTopic,
  Subscriber,
  TicketCreatedEvent,
  TicketPayload,
} from '@tnticketingdev/common';
import { Message } from 'rhea';
import { queueName } from './QueueName';
import { Ticket } from '../../models/Ticket';

export class TicketCreatedSubscriber extends Subscriber<TicketCreatedEvent> {
  readonly topic = DomainTopic.TicketCreated;
  queue: string = queueName;
  async onMessage(payload: TicketPayload, msg: Message) {
    console.log('receive ticket created', payload);

    const ticket = Ticket.build({
      id: payload.id,
      title: payload.title,
      price: payload.price,
    });

    await ticket.save();
  }
}
