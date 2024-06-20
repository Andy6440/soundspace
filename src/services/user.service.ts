import { config } from "../config/config";
import { User, UserTop } from "../interfaces/user.interface";
import { Artist } from "../interfaces/artist.interface";
import { userHelper } from "../utils/helpers/user.helper";
import { handleUserData, handleUserTop } from "../utils/transformers/user.transformer";

import { httpService } from "./http.service";

/**
 * Represents a service for managing user-related operations.
 */
class UserService {
  private static instance: UserService; // Private static property to hold the instance

  /**
   * Returns the singleton instance of the UserService class.
   * @returns The singleton instance of the UserService class.
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Retrieves user data using the provided access token.
   * @param access_token - The access token for authentication.
   * @returns A promise that resolves to the user data.
   * @throws An error if there is an issue with the request.
   */
  public async get(access_token: string) {
    try {
      const url = `${config.api_spotify_url}/me`;
      const response: User = await httpService.get(url, access_token);

      return handleUserData(response);
    } catch (error) {
      
      throw new Error("Error al hacer la solicitud");
    }
  }
  public async getTopByType(access_token: string, type: string, time_range?: string, limit?: string, offset?: string) {
    try{

      let params =new URLSearchParams({
        offset: offset && offset!=='' ? offset.toString() : "0",
        limit: limit  && limit!=='' ? limit.toString() : "20",
        time_range: time_range  && time_range!=='' ? time_range : "medium_term",
      });
      const url = `${config.api_spotify_url}/me/top/${type}?${params.toString()}`;
          const response :UserTop  = await httpService.get(url, access_token) ;
          const result = handleUserTop(response)
          return result
    }catch (error) {
      throw new Error("Error al hacer la solicitud");
    }
   return 'hola'
  }
}

export const userService = UserService.getInstance();
