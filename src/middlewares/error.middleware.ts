import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/badRequest.error';
import { AppError } from '../errors/app.error';

export const errorMiddleware = (
  err: BadRequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
};
