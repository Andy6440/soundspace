import { Request, Response, NextFunction } from 'express';
import { jwtInstance } from '../utils/jwt.util';
import { userDbServices } from '../services/db/user.db.service';
import { AccessToken } from '../interfaces/user.interface';
import { ISession } from '../types/express-session';

const extractToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    req.query.token = token;
  } else {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  next();
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.token) {
    try {
      const decoded = jwtInstance.verifyToken(req.query.token as string);
      req.query.decodedToken = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Token not provided' });
  }
};

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.query.decodedToken as any;
  const authToken = req.query.token as string;
  if (data && data.email && authToken) {
    try {
      const user = await userDbServices.getUserByEmail(data.email);
      if (user && user.access_token) {
        if (authToken !== user.api_token) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        const token = user.access_token as AccessToken;
        if (!req.session) {
          return res.status(500).json({ message: 'Session not initialized' });
        }
        (req.session as ISession).email = user.email;
        (req.session as ISession).token = token;

        next();
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid token payload' });
  }
};

const authMiddleware = [extractToken, verifyToken, fetchUser];

export default authMiddleware;
