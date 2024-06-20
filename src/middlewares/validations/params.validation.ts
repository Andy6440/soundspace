import { Request, Response, NextFunction } from 'express';

const validateParams = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const param of params) {
      if (!req.query[param] || typeof req.query[param] !== 'string') {
        throw new Error(`Invalid  query string parameter : ${param}`);
      }
    }
    next();
  };
};

export default validateParams;
