import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { BadRequestError } from './BadRequestError';
import { BadRequestProblemDocument } from './BadRequestProblemDocument';

export class BadRequestErrorMapper extends ErrorMapper {
  constructor() {
    super(BadRequestError);
  }
  mapError(error: Error): ProblemDocument {
    const badReqError = error as BadRequestError;
    return new BadRequestProblemDocument(badReqError.message);
  }
}
