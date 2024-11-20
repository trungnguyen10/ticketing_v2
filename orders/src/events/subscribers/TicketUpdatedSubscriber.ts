import {
  DomainTopic,
  Subscriber,
  TicketPayload,
  TicketUpdatedEvent,
} from '@tnticketingdev/common';
import { Message } from 'rhea';
import { queueName } from './QueueName';
import { Ticket } from '../../models/Ticket';

export class TicketUpdatedSubscriber extends Subscriber<TicketUpdatedEvent> {
  readonly topic = DomainTopic.TicketUpdated;
  queue = queueName;
  async onMessage(payload: TicketPayload, msg: Message) {
    const ticket = await Ticket.findById(payload.id);
    if (!ticket) {
      throw new Error(`ticket id ${payload.id} not found`);
    }

    console.log('found existing ticket', ticket);

    const { title, price } = payload;
    ticket.set({ title, price });
    await ticket.save();
  }
}
