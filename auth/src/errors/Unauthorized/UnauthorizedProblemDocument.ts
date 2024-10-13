import { ProblemDocument } from 'http-problem-details';

export class UnauthorizedProblemDocument extends ProblemDocument {
  /**
   *
   */
  constructor() {
    super({
      status: 401,
      type: 'https://tools.ietf.org/html/rfc9110#section-15.5.2',
      title: 'Unauthorized',
    });
  }
}
