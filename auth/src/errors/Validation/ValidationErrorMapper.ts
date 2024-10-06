import { FieldValidationError } from 'express-validator';
import { ProblemDocument } from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { ValidationError } from './ValidationError';
import {
  ErrorDetail,
  ValidationProblemDocument,
} from './ValidationProblemDocument';

export class ValidationErrorMapper extends ErrorMapper {
  constructor() {
    super(ValidationError);
  }
  mapError(error: Error): ProblemDocument {
    const validationError = error as ValidationError;
    const map = new Map<string, string[]>();
    for (let error of validationError.errors) {
      const field = error as FieldValidationError;
      if (!map.has(field.path)) {
        map.set(field.path, []);
      }
      const messages = map.get(field.path) as string[];
      messages.push(field.msg as string);
    }
    let errorDetails: ErrorDetail = {};
    for (const [key, value] of map) {
      errorDetails[key] = value;
    }
    return new ValidationProblemDocument(errorDetails);
  }
}
