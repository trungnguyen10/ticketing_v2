import { InvalidError } from '../InvalidError';

export class ResourceExistsError extends InvalidError {
  constructor(public resourceName: string, public resourceId: string) {
    super(
      `${resourceName} ${resourceId} already exists`,
      'Resource already exists'
    );
  }
}
