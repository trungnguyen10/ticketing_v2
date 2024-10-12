export class BadRequestError extends Error {
  constructor(message?: string, public title?: string) {
    super(message);
  }
}
