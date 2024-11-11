import container, { Connection, ConnectionOptions, EventContext } from 'rhea';

export class AmqpConnection {
  private _connection?: Connection;

  /**
   * @returns {Connection | undefined} the connected connection. If not connected, an error will be thrown
   */
  public get connection() {
    if (!this._connection) {
      throw new Error('Cannot access connection before connecting');
    }
    return this._connection;
  }

  constructor(private option?: ConnectionOptions) {}

  connectAsync() {
    if (this._connection) {
      return Promise.resolve();
    }
    this._connection = container.connect(this.option);
    const connection = this._connection;
    return new Promise<void>((resolve, reject) => {
      connection.on('connection_open', () => {
        console.log(`${this.constructor.name} connected`);
        resolve();
      });

      connection.on('connection_error', (context: EventContext) => {
        reject(context.error);
      });
    });
  }

  closeAsync() {
    const connection = this._connection;
    if (!connection) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      connection.on('connection_close', () => {
        console.log(`${this.constructor.name} closed`);
        resolve();
      });

      connection.on('connection_error', (context: EventContext) => {
        reject(context.error);
      });

      connection.close();
    });
  }
}
