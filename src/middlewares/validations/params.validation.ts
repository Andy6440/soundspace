import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/app.error';

const validateParams = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const param of params) {
      if (!req.query[param] || typeof req.query[param] !== 'string') {
        const error = new AppError(
          `Invalid query string parameter: ${param}`,
          400,
        );
        return res.status(400).json(error);
      }
    }
    next();
  };
};

const validateArrayString = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    for (const param of params) {
      if (
        !(
          Array.isArray(req.body[param]) &&
          req.body[param].every((item: string) => typeof item === 'string')
        )
      ) {
        const error = new AppError(
          `Invalid parameter: ${param}. Expected an array of strings.`,
          400,
        );
        return res.status(400).json(error);
      }
    }
    next();
  };
};

export { validateParams, validateArrayString };
