import { Request, Response, NextFunction } from 'express';

const validateOptionalParamsNumber = (params: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const param of params) {
      const value = Number(req.query[param]);
      if (!req.query[param]) {
        req.query[param] = '';
      } else if (!Number.isFinite(value)) {
        throw new Error(`Invalid  query number parameter : ${param}`);
      }
    }
    next();
  };
};

export default validateOptionalParamsNumber;
