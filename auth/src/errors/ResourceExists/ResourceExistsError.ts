export class ResourceExistsError extends Error {
  constructor(public resourceName: string, public resourceId: string) {
    super();
  }
}
