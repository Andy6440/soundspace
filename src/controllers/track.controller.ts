import { Request, Response } from 'express';
import { ISession } from '../types/express-session';
import { trackService } from '../services/track.service';
import { handleTrack } from '../utils/transformers/track.transformer';
export class TrackController {
  constructor() {}

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
        throw new Error('Error al obtener los datos del usuario');
      }
    } else {
      throw new Error('No se encontro el token de acceso');
    }
  }

  static async getSeveralTracks(req: Request, res: Response) {
    const auth = (req.session as ISession).token;
    if (auth?.access_token) {
      try {
        const token = auth.access_token as string;
        console.log(req.body.ids);
        res.send(token);
      } catch (error) {
        throw new Error('Error al obtener los datos del usuario');
      }
    } else {
      throw new Error('No se encontro el token de acceso');
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
        throw new Error('Error al obtener los datos del usuario');
      }
    } else {
      throw new Error('No se encontro el token de acceso');
    }
  }
}
