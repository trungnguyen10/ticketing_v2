export class NotFoundError extends Error {
  constructor(resourceName?: string) {
    super(resourceName ? `${resourceName} not found` : undefined);
  }
}
