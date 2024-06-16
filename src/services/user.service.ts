import { config } from "../config/config";
import { User } from "../interfaces/user.interface";
import { handleUserData } from "../utils/transformers/user.transformer";

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
}

export const userService = UserService.getInstance();
