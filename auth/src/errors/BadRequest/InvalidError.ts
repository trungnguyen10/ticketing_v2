export class InvalidError extends Error {
  constructor(message?: string, public title?: string) {
    super(message);
  }
}
