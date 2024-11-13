import { DomainTopic, TicketPayload } from '@tnticketingdev/common';
import { now } from 'mongoose';
import { amqpConnection } from '../amqpConnection';
import { resolvePublishAddress } from '../events/addressResolver';
import { TicketCreatedPublisher } from '../events/publishers/TicketCreatedPublisher';
import { TicketUpdatedPublisher } from '../events/publishers/TicketUpdatedPublisher';
import { OutBoxItem } from './OutBoxItem';

export const publishOutBoxItemAsync = async () => {
  // TODO: wrapping around a transaction requires to setup replica set for local instance of MongoDb
  const outBoxItems = await OutBoxItem.where({
    publishedAt: undefined,
  });

  for (let item of outBoxItems) {
    let publisher;
    switch (item.topic) {
      case DomainTopic.TicketCreated:
        publisher = new TicketCreatedPublisher(
          amqpConnection,
          resolvePublishAddress
        );
        break;
      case DomainTopic.TicketUpdated:
        publisher = new TicketUpdatedPublisher(
          amqpConnection,
          resolvePublishAddress
        );
        break;
      default:
        throw new Error('unknown topic');
    }
    await publisher.publishAsync(item.payload as TicketPayload);
    item.publishedAt = now();
    await item.save();
  }
};
