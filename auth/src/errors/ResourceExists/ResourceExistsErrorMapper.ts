import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { ResourceExistsError } from './ResourceExistsError';
import { ResourceExistsProblemDocument } from './ResourceExistsProblemDocument';

export class ResourceExistsErrorMapper extends ErrorMapper {
  constructor() {
    super(ResourceExistsError);
  }
  mapError(error: Error): ProblemDocument {
    const resourceExistsError = error as ResourceExistsError;
    return new ResourceExistsProblemDocument(
      resourceExistsError.resourceName,
      resourceExistsError.resourceId
    );
  }
}
