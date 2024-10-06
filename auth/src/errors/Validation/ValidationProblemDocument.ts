import { ProblemDocument } from 'http-problem-details';

export type ErrorDetail = { [key: string]: string[] };

export class ValidationProblemDocument extends ProblemDocument {
  /**
   *
   */
  constructor(public errors: ErrorDetail) {
    super(
      {
        status: 400,
        type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
        title: 'One or more validation errors occurred.',
      },
      { errors: errors }
    );
  }
}
