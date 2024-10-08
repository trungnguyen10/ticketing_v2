import { ProblemDocument } from 'http-problem-details';

export class ResourceExistsProblemDocument extends ProblemDocument {
  /**
   *
   */
  constructor(resourceName: string, resourceId: string) {
    super({
      status: 400,
      type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
      title: 'Resource already exists',
      detail: `${resourceName} ${resourceId} already exists`,
    });
  }
}
