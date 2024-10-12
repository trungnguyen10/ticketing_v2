import { BadRequestError } from '../BadRequestError';

export class ResourceExistsError extends BadRequestError {
  constructor(public resourceName: string, public resourceId: string) {
    super(
      `${resourceName} ${resourceId} already exists`,
      'Resource already exists'
    );
  }
}
