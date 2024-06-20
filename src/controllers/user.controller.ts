import { Request, Response } from "express";
import { AccessToken } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { ISession } from "../types/express-session";
export class UserController {
  constructor() {}

  static async getTopByType(req: Request, res: Response) {
    let auth = (req.session as ISession).token;
    const type = req.query.type as string;
    if (auth?.access_token && type) {
      const time_range = req.query.time_range?.toString();
      const limit = req.query.limit?.toString();
      const offset = req.query.offset?.toString();

      let token = auth.access_token as string;
      try {
        const data = await userService.getTopByType(
          token,
          type,
          time_range,
          limit,
          offset
        );
        res.send(data);
      } catch (error) {
        throw new Error("Error al obtener los datos del usuario");
      }
    } else {
      throw new Error("No se encontro el token de acceso");
    }
  }
}
