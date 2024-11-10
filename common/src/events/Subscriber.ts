import { Connection, EventContext, Message, Receiver } from 'rhea';
import { DomainEvent } from './DomainEvent';

export abstract class Subscriber<T extends DomainEvent> {
  abstract topic: T['topic'];
  abstract queue: string;
  abstract onMessage(payload: T['payload'], msg: Message): void;
  private connection: Connection;
  private receiver: Receiver | undefined;

  constructor(
    connection: Connection,
    private linkAddressResolver: (topic: T['topic'], queue: string) => string
  ) {
    this.connection = connection;
  }

  subscribe() {
    if (!this.receiver) {
      this.receiver = this.connection.open_receiver({
        source: this.linkAddressResolver(this.topic, this.queue),
        autoaccept: false, // Disables auto-acknowledgment
      });
    }

    this.receiver.on('message', (context: EventContext) => {
      console.log(`${this.topic}/${this.queue} - message received`);

      const message = context.message;

      if (message) {
        try {
          this.onMessage(message.body, message);
          context.delivery!.accept();
        } catch (err) {
          console.log(err);
          context.delivery!.release({
            delivery_failed: true,
          });
        }
      }
    });
  }

  close() {
    this.receiver?.close();
  }
}
