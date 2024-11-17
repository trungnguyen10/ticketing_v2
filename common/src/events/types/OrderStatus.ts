export enum OrderStatus {
  /**
   * order has been created, but the ticket that it is trying to order has not been reserved
   */
  Created = 'created',

  /**
   * the ticket that the order is trying to reserve has already been reserved, or when the user cancelled the order, or the order expires before payment
   */
  Cancelled = 'cancelled',

  /**
   * The order has successfully reserved the ticket
   */
  AwaitingPayment = 'awaiting.payment',

  /**
   * The order has reserved the ticket and the user has provided payment successfully
   */
  Complete = 'complete',
}
