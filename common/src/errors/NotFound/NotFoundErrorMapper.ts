import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';

import { NotFoundError } from './NotFoundError';
import { NotFoundProblemDocument } from './NotFoundProblemDocument';

export class NotFoundErrorMapper extends ErrorMapper {
  constructor() {
    super(NotFoundError);
  }
  mapError(_error: Error): ProblemDocument {
    return new NotFoundProblemDocument();
  }
}
