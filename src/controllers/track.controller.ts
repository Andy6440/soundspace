import { Request, Response } from 'express';
import { ISession } from '../types/express-session';
import { trackService } from '../services/track.service';
export class TrackController {
  constructor() {}

  static async get(req: Request, res: Response) {
    const auth = (req.session as ISession).token;
    if (auth?.access_token) {
      const token = auth.access_token as string;
      try {
        const data = await trackService.getById(
          token,
          '11dFghVXANMlKmJXsNCbNl',
        );
        res.send(data);
      } catch (error) {
        throw new Error('Error al obtener los datos del usuario');
      }
    } else {
      throw new Error('No se encontro el token de acceso');
    }
  }
}
