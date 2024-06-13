import { config } from "../config/config";
import { User } from "../interfaces/user.interface";
import { handleUserData } from "../utils/transformers/user.transformer";

import { httpService } from "./http.service";

class UserService {
  private static instance: UserService; // Private static property to hold the instance

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async get(access_token: string) {
    try {
      const url = `${config.api_spotify_url}/me`;
      const response: User = await httpService.get(url, access_token);
      return  handleUserData(response)
    } catch (error) {
      throw new Error("Error al hacer la solicitud");
    }
  }
}

export const userService = UserService.getInstance();
