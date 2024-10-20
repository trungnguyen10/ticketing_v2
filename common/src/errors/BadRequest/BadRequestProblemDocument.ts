import {
  ProblemDocument,
  ProblemDocumentExtension,
} from 'http-problem-details';

export class BadRequestProblemDocument extends ProblemDocument {
  constructor(
    detail: string,
    title?: string,
    extension?: ProblemDocumentExtension | Record<string, Object>
  ) {
    super(
      {
        status: 400,
        type: 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
        title: title ?? 'Bad Request',
        detail: detail,
      },
      extension
    );
  }
}
