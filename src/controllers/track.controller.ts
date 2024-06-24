import { NextFunction, Request, Response } from 'express';
import { ISession } from '../types/express-session';
import { trackService } from '../services/track.service';
import { handleTrack } from '../utils/transformers/track.transformer';
import { BadRequestError } from '../errors/badRequest.error';
export class TrackController {
  constructor() {
    throw new Error('Cannot create an instance of a static class');
  }

  static async get(req: Request, res: Response) {
    const auth = (req.session as ISession).token;
    if (auth?.access_token) {
      try {
        const token = auth.access_token as string;
        const id = req.query.id as string;
        const response = await trackService.getById(token, id);
        const data = handleTrack(response);
        res.send(data);
      } catch (error) {
        throw new Error('Error retrieving user data');
      }
    } else {
      throw new Error('Access token not found');
    }
  }

  static async getSeveralTracks(req: Request, res: Response) {
    const auth = (req.session as ISession).token;
    if (auth?.access_token) {
      try {
        const token = auth.access_token as string;
        res.send(token);
      } catch (error) {
        throw new Error('Error retrieving user data');
      }
    } else {
      throw new Error('Access token not found');
    }
  }

  static async getUsersSavedTracks(req: Request, res: Response) {
    const auth = (req.session as ISession).token;
    if (auth?.access_token) {
      try {
        const token = auth.access_token as string;
        const limit = req.query.limit as string;
        const offset = req.query.offset as string;
        const response = await trackService.getUsersSavedTracks(
          token,
          limit,
          offset,
        );
        res.send(response);
      } catch (error) {
        throw new Error('Error retrieving user data');
      }
    } else {
      throw new Error('Access token not found');
    }
  }

  static async saveTrackUser(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = (req.session as ISession).token;
      if (auth?.access_token) {
        const token = auth.access_token as string;
        const ids = req.body.ids as string[];
        const response = await trackService.saveTrackUser(token, ids);
        if (response.status === 200) {
          response.message = 'Songs saved successfully';
          res.send(response);
        } else {
          throw new BadRequestError(response.message, response.status);
        }
      } else {
        throw new Error('Access token not found');
      }
    } catch (error) {
      next(error);
    }
  }

  static async removeTrackUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const auth = (req.session as ISession).token;
      if (auth?.access_token) {
        const token = auth.access_token as string;
        const ids = req.body.ids as string[];
        const response = await trackService.removeTrackUser(token, ids);
        if (response.status === 200) {
          response.message = 'Songs deleted successfully';
          res.send(response);
        } else {
          throw new BadRequestError(response.message, response.status);
        }
      } else {
        throw new Error('Access token not found');
      }
    } catch (error) {
      next(error);
    }
  }

  static async checkUsersSavedTracks(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const auth = (req.session as ISession).token;
      if (auth?.access_token) {
        const token = auth.access_token as string;
        const ids = req.body.ids as string[];
        const response = await trackService.checkUsersSavedTracks(token, ids);

        res.send(response);
      } else {
        throw new Error('Access token not found');
      }
    } catch (error) {
      next(error);
    }
  }
}
