import { Request, Response, NextFunction } from 'express';

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
};