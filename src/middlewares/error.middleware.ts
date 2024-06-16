// errorMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosError } from 'axios';
import { AppError } from '../errors/app.error';
import { BadRequestError } from '../errors/badRequest.error';

/**
 * Express middleware for handling errors.
 * @param err - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  let error: AppError = err as AppError; // Cast to AppError for better type handling
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError;
    console.error('Spotify API request failed:', axiosError);
    // const spotifyErrorCode = axiosError.response?.data?.error?.message; // Adjust path as needed
    error = new BadRequestError('Spotify API request failed','nada');
  } else if (!(err instanceof AppError)) {
    // For non-AppError errors, log the error and create a generic 500 error
    console.error('Unexpected error:', err);
    error = new AppError('Internal Server Error', 500);
  }

  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message,
    // Include additional details if needed (e.g., error.spotifyErrorCode)
  });
};

export default errorHandler;
