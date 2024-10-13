import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { UnauthorizedProblemDocument } from './UnauthorizedProblemDocument';
import { UnauthorizedError } from './UnauthorizedError';

export class UnauthorizedErrorMapper extends ErrorMapper {
  /**
   *
   */
  constructor() {
    super(UnauthorizedError);
  }
  mapError(_error: Error): ProblemDocument {
    return new UnauthorizedProblemDocument();
  }
}
