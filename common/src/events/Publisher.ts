import { Connection, Sender } from 'rhea';
import { DomainEvent } from './DomainEvent';
import { AmqpConnection } from './AmqpConnection';

export abstract class Publisher<T extends DomainEvent> {
  abstract topic: T['topic'];
  private connection: Connection;
  private sender: Sender | undefined;

  constructor(
    connection: AmqpConnection,
    private resolveLinkAddress: (topic: T['topic']) => string
  ) {
    this.connection = connection.connection!;
  }

  publishAsync(payload: T['payload']) {
    if (!this.sender) {
      const address = this.resolveLinkAddress(this.topic);
      this.sender = this.connection.open_sender({ target: address });
    }
    const sender = this.sender;
    return new Promise((resolve, reject) => {
      // Listen for the message acknowledgment event
      sender.once('accepted', (context) => {
        resolve(context);
      });

      // Handle errors or message rejections
      sender.once('rejected', (context) => {
        reject(new Error('Message rejected by broker'));
      });

      sender.once('released', (context) => {
        reject(new Error('Message released by broker'));
      });

      // Send the message
      sender.send({ body: payload, durable: true });
    });
  }

  close() {
    this.sender?.close();
  }
}
