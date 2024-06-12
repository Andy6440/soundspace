import express, { Request, Response, response } from "express";
import { generateRandomString } from '../utils/string.utils';
import { AccessToken } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { config } from "../config/config";
export class AuthController  {

    static async handleLogin(req: Request, res: Response) {
      var state = generateRandomString(16);
      var scope = 'user-read-private user-read-email';
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: config.client_id,
        scope: scope,
        redirect_uri: config.redirect_uri,
        state: state,
      });
    
      const authorizationUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
      console.log('authorization url',authorizationUrl);
      res.redirect(authorizationUrl);
    }

     static async handleCallback(req: Request, res: Response) {
      try {
          let tokens: AccessToken
          if (req?.cookies?.tokens) {
              tokens = req.cookies
          } else {

              const code = req.query.code as string
              //Get access token
              tokens = await authService.getAccessToken(code)
          }
    
          // //Get user profile
          // const profile: Profile = await getUser(tokens.access_token)
          // //Save user in DB
          // const user = await UserService.handleUser(profile, tokens)
          // //Send user profile
          // res.send(user)

          res.send(tokens)
      } catch (err) {
         res.status(500).send(err)
      }
    }
      

}


