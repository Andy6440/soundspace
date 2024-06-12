import { response } from "express";
import { config } from "../config/config";
import { AccessToken, IAuth } from "../interfaces/user.interface";
import { httpService } from "./http.service";

class AuthService implements IAuth {
  private static instance: AuthService; // Private static property to hold the instance

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  public async getAccessToken(code: string): Promise<AccessToken> {
    const params = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: config.redirect_uri,
    };
    console.log(params)
    try {
      const response = (await httpService.post(
        "/token",
        params
      )) as AccessToken;

      return response;
    } catch (error) {
      throw new Error("Error al hacer la solicitud");
    }
  }
}

export const authService = AuthService.getInstance();
