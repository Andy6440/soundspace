import express, { NextFunction, Request, Response } from "express";
import { generateRandomString } from "../utils/string.utils";
import { AccessToken } from "../interfaces/user.interface";
import { apiResponse } from "../interfaces/apiResponse.interface";
import { authService } from "../services/auth.service";
import { config,spotifyScopes } from "../config/config";
import { userService } from "../services/user.service";
import { userDbServices } from "../services/db/user.db.service";
import { jwtInstance } from "../utils/jwt.util";
/**
 * Controller class for handling authentication-related operations.
 */
export class AuthController {
  /**
   * Handles the login process.
   * Generates a random state, constructs the authorization URL, and redirects the user to it.
   * @param _req - The request object.
   * @param res - The response object.
   */
  static async handleLogin(_req: Request, res: Response) {
    var state = generateRandomString(16);
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.client_id,
      scope: spotifyScopes.login,
      redirect_uri: config.redirect_uri,
      state: state,
    });

    const authorizationUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    res.redirect(authorizationUrl);
  }

  static async handleLoginWithClientCredentials(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let client_id = config.client_id as string;
      let client_secret = config.client_secret as string;

      const tokens = (await authService.getAccessTokenWithClientCredentials(
        client_id,
        client_secret
      )) as AccessToken;
      res.send(tokens);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles the callback from the authentication provider.
   * Retrieves the access token and user profile, and updates the user data in the database.
   * If the access token is already present in the cookies, it uses the existing token.
   * Otherwise, it retrieves the access token using the authorization code and stores it in the cookies.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function to call.
   */
  static async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      let tokens: AccessToken;
      if (req?.cookies?.tokens) {
        tokens = req.cookies.tokens as AccessToken;
      } else {
        const code = req.query.code as string;
        //Get access token
        tokens = await authService.getAccessToken(code);

       
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
        res.cookie("tokens", tokens, { maxAge: oneDayInMilliseconds });
      }

      //Get user profile
      const userData = await userService.get(tokens.access_token);
      userData.access_token = tokens;
      userData.api_token = jwtInstance.generateToken({email: userData.email});

      //Save user in DB
      const user = await userDbServices.updateUserData(userData);
      if(user){
        const response = {
          message: "User Logged in",
          status: 200,
          data: {
            token: userData.api_token
          }
        } as  apiResponse
      
        res.send(response);
      }else{
        throw new Error("Error al Iniciar sesion");
      }

      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  static async handleRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let refreshToken: string;
      if (req?.query?.refresh_token) {
        refreshToken = req.query.refresh_token as string;
        let tokens = await authService.refreshToken(refreshToken);
        res.send(tokens);
      } else {
        throw new Error("No token found");
      }
    } catch (err) {
      next(err);
    }
  }
}
