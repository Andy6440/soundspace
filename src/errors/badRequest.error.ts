// badRequest.error.ts
import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(message: string, code: number = 400) {
    super(message, code);
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
