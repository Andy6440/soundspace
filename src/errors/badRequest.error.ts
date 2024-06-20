import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(
    message: string,
    public spotifyErrorCode?: string,
  ) {
    super(message, 400);
  }
}
