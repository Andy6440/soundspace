import { Request, Response } from "express";
import { AccessToken } from "../interfaces/user.interface";
import { userService } from "../services/user.service";
import { ISession } from "../types/express-session";
export class UserController {
  constructor() {}

  static async getTopByType(req: Request, res: Response) {
    let  auth = (req.session as ISession).token;
    const type = req.query.type as string;
    if (auth?.access_token && type) {
      let token  = auth.access_token as string
      userService
        .getTopByType(token,type)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          throw new Error("Error al hacer la solicitud");
        });
    } else {
      throw new Error("No se encontro el token de acceso");
    }
  }
}
