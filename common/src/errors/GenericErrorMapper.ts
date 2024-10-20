import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';

export class GenericErrorMapper extends ErrorMapper {
  constructor() {
    super(Error);
  }
  mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      status: 500,
      type: 'https://tools.ietf.org/html/rfc9110#section-15.6.1',
      title: 'An error occurred while processing your request.',
      detail: 'An error occurred.',
    });
  }
}
