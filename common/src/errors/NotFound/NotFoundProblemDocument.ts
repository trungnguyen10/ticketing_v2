import { ProblemDocument } from 'http-problem-details';

export class NotFoundProblemDocument extends ProblemDocument {
  /**
   *
   */
  constructor() {
    super({
      status: 404,
      type: 'https://tools.ietf.org/html/rfc9110#section-15.5.5',
      title: 'Not Found',
    });
  }
}
