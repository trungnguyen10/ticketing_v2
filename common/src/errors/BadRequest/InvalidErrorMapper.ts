import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { InvalidError } from './InvalidError';
import { BadRequestProblemDocument } from './BadRequestProblemDocument';

export class InvalidErrorMapper extends ErrorMapper {
  constructor() {
    super(InvalidError);
  }
  mapError(error: Error): ProblemDocument {
    const badReqError = error as InvalidError;
    return new BadRequestProblemDocument(badReqError.message);
  }
}
