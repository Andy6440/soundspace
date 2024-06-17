import { Request, Response } from "express";
export class UserController {
  constructor() {}

  static async  getTopByType(req: Request, res: Response) {
    console.log(req);
    res.send("Hello World");
  }
}
