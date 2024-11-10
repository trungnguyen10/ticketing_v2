import container, { Connection, ConnectionOptions, EventContext } from 'rhea';

export class AmqpConnection {
  private _connection?: Connection;

  /**
   * @returns {Connection | undefined} the connection if connected otherwise undefined
   */
  public get connection() {
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
        console.log('connected');
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
        console.log('connection closed!');
        resolve();
      });

      connection.on('connection_error', (context: EventContext) => {
        reject(context.error);
      });

      connection.close();
    });
  }
}
